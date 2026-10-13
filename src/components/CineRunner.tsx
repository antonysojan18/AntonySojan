import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, RotateCcw, Trophy, Play, Clapperboard } from "lucide-react";

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "clapper" | "bug" | "tripod" | "error";
  passed: boolean;
}

interface Collectible {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "lens" | "coffee";
  collected: boolean;
  floatOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface ScorePopup {
  x: number;
  y: number;
  text: string;
  alpha: number;
  color: string;
}

const CineRunner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [currentRank, setCurrentRank] = useState("Production Assistant");

  // Audio Context (Synthesized sound effects without external assets)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = useCallback((type: "jump" | "collect" | "gameover") => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "jump") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "collect") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.24);
        osc.start(now);
        osc.stop(now + 0.24);
      } else if (type === "gameover") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {
      // Audio not supported or blocked
    }
  }, [isMuted]);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("as-cine-runner-highscore");
    if (saved) {
      setHighScore(parseInt(saved, 10) || 0);
    }
  }, []);

  // Update rank based on score
  useEffect(() => {
    if (score >= 1200) setCurrentRank("Legendary Director");
    else if (score >= 700) setCurrentRank("Director of Photography");
    else if (score >= 350) setCurrentRank("Cinematographer");
    else if (score >= 150) setCurrentRank("Focus Puller");
    else setCurrentRank("Production Assistant");
  }, [score]);

  // Game Engine State (Refs for 60fps canvas loop)
  const engineRef = useRef({
    player: {
      x: 75,
      y: 0,
      width: 32,
      height: 44,
      vy: 0,
      groundY: 0,
      jumpsLeft: 2,
      runFrame: 0,
      isGrounded: true,
    },
    obstacles: [] as Obstacle[],
    collectibles: [] as Collectible[],
    particles: [] as Particle[],
    popups: [] as ScorePopup[],
    speed: 4.5,
    distance: 0,
    currentScore: 0,
    lastObstacleX: 0,
    lastCollectibleX: 0,
    trackOffset: 0,
    state: "idle" as "idle" | "playing" | "gameover",
    animId: 0,
  });

  const jump = useCallback(() => {
    const eng = engineRef.current;
    if (eng.state === "idle" || eng.state === "gameover") {
      startGame();
      return;
    }

    if (eng.state === "playing" && eng.player.jumpsLeft > 0) {
      eng.player.vy = eng.player.jumpsLeft === 2 ? -9.8 : -8.6;
      eng.player.jumpsLeft -= 1;
      eng.player.isGrounded = false;
      playSound("jump");

      // Jump dust particles
      for (let i = 0; i < 6; i++) {
        eng.particles.push({
          x: eng.player.x + eng.player.width / 2,
          y: eng.player.y + eng.player.height,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * -2,
          alpha: 0.8,
          color: "#226192",
          size: Math.random() * 3 + 1.5,
        });
      }
    }
  }, [playSound]);

  const startGame = useCallback(() => {
    const eng = engineRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const groundY = canvas.height - 40 * dpr;
    eng.player.y = groundY - eng.player.height * dpr;
    eng.player.groundY = groundY;
    eng.player.vy = 0;
    eng.player.jumpsLeft = 2;
    eng.player.isGrounded = true;
    eng.obstacles = [];
    eng.collectibles = [];
    eng.particles = [];
    eng.popups = [];
    eng.speed = 4.5;
    eng.distance = 0;
    eng.currentScore = 0;
    eng.lastObstacleX = 100; // Generous distance before first obstacle
    eng.lastCollectibleX = 60;
    eng.state = "playing";

    setScore(0);
    setGameState("playing");
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        if (gameState === "playing" || containerRef.current?.matches(":hover")) {
          e.preventDefault();
        }
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump, gameState]);

  // Main Canvas Render & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      engineRef.current.player.groundY = canvas.height - 40 * dpr;
      if (engineRef.current.state === "idle" || engineRef.current.state === "gameover") {
        engineRef.current.player.y = engineRef.current.player.groundY - engineRef.current.player.height * dpr;
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const eng = engineRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const groundY = height - 40 * dpr;
      const p = eng.player;

      // 1. Clear Canvas with architectural paper background
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#FAF8F5";
      ctx.fillRect(0, 0, width, height);

      // 2. Drafting Grid Background
      ctx.strokeStyle = "rgba(34, 97, 146, 0.05)";
      ctx.lineWidth = 1 * dpr;
      const gridSize = 24 * dpr;
      eng.trackOffset = (eng.trackOffset + (eng.state === "playing" ? eng.speed * dpr : 0.8 * dpr)) % gridSize;

      for (let x = -eng.trackOffset; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, groundY);
        ctx.stroke();
      }

      // Parallax distant skyline / mountains
      ctx.fillStyle = "rgba(34, 97, 146, 0.035)";
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      const hillOffset = (eng.distance * 0.15) % 400;
      for (let x = 0; x <= width + 120; x += 120 * dpr) {
        const hillX = x - hillOffset * dpr;
        ctx.lineTo(hillX, groundY - 32 * dpr - Math.sin((hillX + 200) * 0.008) * 14 * dpr);
      }
      ctx.lineTo(width, groundY);
      ctx.closePath();
      ctx.fill();

      // 3. Ground Track - Deep Editorial Blue film strip extending to bottom
      ctx.fillStyle = "#226192";
      ctx.fillRect(0, groundY, width, height - groundY);

      // Film Sprocket Holes along the bottom track
      ctx.fillStyle = "#FAF8F5";
      const sprocketSize = 5 * dpr;
      const sprocketSpacing = 16 * dpr;
      const sprocketOffset = (eng.trackOffset * 1.5) % sprocketSpacing;
      for (let sx = -sprocketOffset; sx < width; sx += sprocketSpacing) {
        ctx.fillRect(sx, groundY + 11 * dpr, sprocketSize, sprocketSize * 1.6);
      }

      // Ground Top Trim Line
      ctx.strokeStyle = "rgba(239, 133, 87, 0.65)";
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // 4. Game Updates if Playing
      if (eng.state === "playing") {
        eng.distance += eng.speed;
        eng.currentScore = Math.floor(eng.distance / 10);
        setScore(eng.currentScore);

        // Relaxed, gradual speed ramp with comfortable cap
        if (eng.speed < 7.5) {
          eng.speed += dt * 0.02;
        }

        // Apply Player Gravity & Jump Physics
        p.vy += 26 * dt * dpr; // Smooth gravity
        p.y += p.vy;

        if (p.y >= groundY - p.height * dpr) {
          p.y = groundY - p.height * dpr;
          p.vy = 0;
          p.jumpsLeft = 2;
          p.isGrounded = true;
        }

        p.runFrame += dt * 13;

        // Spawn Obstacles with generous distance (simplified, less punishing)
        if (eng.distance - eng.lastObstacleX > 550 + Math.random() * 450) {
          eng.lastObstacleX = eng.distance;
          const types: Obstacle["type"][] = ["clapper", "bug", "tripod", "error"];
          const chosen = types[Math.floor(Math.random() * types.length)];
          const obsHeight = chosen === "tripod" ? 34 : chosen === "bug" ? 20 : 24;
          const obsWidth = chosen === "tripod" ? 18 : chosen === "bug" ? 24 : 26;

          eng.obstacles.push({
            x: width + 30,
            y: groundY - obsHeight * dpr,
            width: obsWidth * dpr,
            height: obsHeight * dpr,
            type: chosen,
            passed: false,
          });
        }

        // Spawn Collectibles (Prime Lenses / Coffee) frequently in the clear zones
        if (eng.distance - eng.lastCollectibleX > 280 + Math.random() * 260) {
          eng.lastCollectibleX = eng.distance;
          const isLens = Math.random() > 0.4;
          const cY = groundY - (38 + Math.random() * 40) * dpr;
          eng.collectibles.push({
            x: width + 20,
            y: cY,
            width: 18 * dpr,
            height: 18 * dpr,
            type: isLens ? "lens" : "coffee",
            collected: false,
            floatOffset: Math.random() * Math.PI * 2,
          });
        }
      }

      // 5. Draw & Update Obstacles
      for (let i = eng.obstacles.length - 1; i >= 0; i--) {
        const obs = eng.obstacles[i];
        if (eng.state === "playing") {
          obs.x -= eng.speed * dpr;
        }

        // Render Obstacle
        if (obs.type === "clapper") {
          // Clapperboard obstacle
          ctx.fillStyle = "#171D3B";
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          // Diagonal stripes
          ctx.fillStyle = "#FAF8F5";
          ctx.beginPath();
          ctx.moveTo(obs.x + 3 * dpr, obs.y);
          ctx.lineTo(obs.x + 9 * dpr, obs.y);
          ctx.lineTo(obs.x + 3 * dpr, obs.y + 10 * dpr);
          ctx.closePath();
          ctx.fill();
        } else if (obs.type === "bug") {
          // Robotic bug obstacle
          ctx.fillStyle = "#722D37";
          ctx.beginPath();
          ctx.roundRect(obs.x, obs.y + 4 * dpr, obs.width, obs.height - 4 * dpr, 4 * dpr);
          ctx.fill();
          // Antennae
          ctx.strokeStyle = "#722D37";
          ctx.lineWidth = 1.5 * dpr;
          ctx.beginPath();
          ctx.moveTo(obs.x + 5 * dpr, obs.y + 4 * dpr);
          ctx.lineTo(obs.x + 2 * dpr, obs.y - 3 * dpr);
          ctx.moveTo(obs.x + obs.width - 5 * dpr, obs.y + 4 * dpr);
          ctx.lineTo(obs.x + obs.width - 2 * dpr, obs.y - 3 * dpr);
          ctx.stroke();
          // Bug text
          ctx.fillStyle = "#FAF8F5";
          ctx.font = `bold ${8 * dpr}px monospace`;
          ctx.textAlign = "center";
          ctx.fillText("</>", obs.x + obs.width / 2, obs.y + obs.height - 4 * dpr);
        } else if (obs.type === "tripod") {
          // Camera Tripod
          ctx.strokeStyle = "#226192";
          ctx.lineWidth = 2 * dpr;
          ctx.beginPath();
          ctx.moveTo(obs.x + obs.width / 2, obs.y);
          ctx.lineTo(obs.x, obs.y + obs.height);
          ctx.moveTo(obs.x + obs.width / 2, obs.y);
          ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          ctx.moveTo(obs.x + obs.width / 2, obs.y);
          ctx.lineTo(obs.x + obs.width / 2, obs.y + obs.height);
          ctx.stroke();
          // Head block
          ctx.fillStyle = "#EF8557";
          ctx.fillRect(obs.x + obs.width / 2 - 4 * dpr, obs.y - 4 * dpr, 8 * dpr, 5 * dpr);
        } else {
          // 404 Block
          ctx.fillStyle = "#226192";
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = "#FAF8F5";
          ctx.font = `bold ${9 * dpr}px monospace`;
          ctx.textAlign = "center";
          ctx.fillText("404", obs.x + obs.width / 2, obs.y + obs.height / 2 + 3 * dpr);
        }

        // Collision Check (Forgiving AABB with relaxed padding)
        if (eng.state === "playing") {
          const px = p.x * dpr + 6 * dpr;
          const py = p.y + 6 * dpr;
          const pw = (p.width - 12) * dpr;
          const ph = (p.height - 9) * dpr;

          if (
            px < obs.x + obs.width &&
            px + pw > obs.x &&
            py < obs.y + obs.height &&
            py + ph > obs.y
          ) {
            // GAME OVER!
            eng.state = "gameover";
            setGameState("gameover");
            playSound("gameover");

            // Update high score
            if (eng.currentScore > highScore) {
              setHighScore(eng.currentScore);
              localStorage.setItem("as-cine-runner-highscore", eng.currentScore.toString());
            }

            // Explosion particles
            for (let k = 0; k < 18; k++) {
              eng.particles.push({
                x: px + pw / 2,
                y: py + ph / 2,
                vx: (Math.random() - 0.5) * 8 * dpr,
                vy: (Math.random() - 0.5) * 8 * dpr,
                alpha: 1,
                color: k % 2 === 0 ? "#EF8557" : "#226192",
                size: Math.random() * 4 * dpr + 2 * dpr,
              });
            }
          }
        }

        // Remove off-screen obstacles
        if (obs.x + obs.width < -60) {
          eng.obstacles.splice(i, 1);
        }
      }

      // 6. Draw & Update Collectibles (Lenses & Coffee)
      for (let i = eng.collectibles.length - 1; i >= 0; i--) {
        const item = eng.collectibles[i];
        if (eng.state === "playing") {
          item.x -= eng.speed * dpr;
        }

        const floatY = item.y + Math.sin(time * 0.005 + item.floatOffset) * 4 * dpr;

        // Render Collectible
        if (item.type === "lens") {
          // Golden Prime Lens ring
          ctx.strokeStyle = "#EF8557";
          ctx.lineWidth = 2.5 * dpr;
          ctx.beginPath();
          ctx.arc(item.x + item.width / 2, floatY + item.height / 2, 7 * dpr, 0, Math.PI * 2);
          ctx.stroke();
          // Inner lens reflection
          ctx.fillStyle = "rgba(34, 97, 146, 0.4)";
          ctx.beginPath();
          ctx.arc(item.x + item.width / 2, floatY + item.height / 2, 5 * dpr, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Coffee cup
          ctx.fillStyle = "#722D37";
          ctx.fillRect(item.x + 2 * dpr, floatY + 3 * dpr, 12 * dpr, 11 * dpr);
          // Handle
          ctx.strokeStyle = "#722D37";
          ctx.lineWidth = 1.5 * dpr;
          ctx.beginPath();
          ctx.arc(item.x + 14 * dpr, floatY + 8 * dpr, 3 * dpr, -Math.PI / 2, Math.PI / 2);
          ctx.stroke();
        }

        // Collision Check with Collectible
        if (eng.state === "playing") {
          const px = p.x * dpr;
          const py = p.y;
          const pw = p.width * dpr;
          const ph = p.height * dpr;

          if (
            px < item.x + item.width &&
            px + pw > item.x &&
            py < floatY + item.height &&
            py + ph > floatY
          ) {
            playSound("collect");
            const bonus = item.type === "lens" ? 50 : 30;
            eng.distance += bonus * 10;
            eng.currentScore += bonus;
            setScore(eng.currentScore);

            // Score popup
            eng.popups.push({
              x: item.x,
              y: floatY - 10 * dpr,
              text: `+${bonus}`,
              alpha: 1,
              color: item.type === "lens" ? "#EF8557" : "#722D37",
            });

            // Sparkle particles
            for (let s = 0; s < 8; s++) {
              eng.particles.push({
                x: item.x + item.width / 2,
                y: floatY + item.height / 2,
                vx: (Math.random() - 0.5) * 4 * dpr,
                vy: (Math.random() - 0.5) * 4 * dpr,
                alpha: 1,
                color: item.type === "lens" ? "#EF8557" : "#226192",
                size: Math.random() * 2.5 * dpr + 1 * dpr,
              });
            }

            eng.collectibles.splice(i, 1);
            continue;
          }
        }

        // Remove off-screen collectibles
        if (item.x + item.width < -50) {
          eng.collectibles.splice(i, 1);
        }
      }

      // 7. Draw & Update Particles
      for (let i = eng.particles.length - 1; i >= 0; i--) {
        const pt = eng.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= dt * 1.6;

        if (pt.alpha <= 0) {
          eng.particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 8. Draw & Update Score Popups
      for (let i = eng.popups.length - 1; i >= 0; i--) {
        const pop = eng.popups[i];
        pop.y -= dt * 25 * dpr;
        pop.alpha -= dt * 1.4;

        if (pop.alpha <= 0) {
          eng.popups.splice(i, 1);
          continue;
        }

        ctx.font = `bold ${11 * dpr}px monospace`;
        ctx.fillStyle = pop.color;
        ctx.globalAlpha = Math.max(0, pop.alpha);
        ctx.textAlign = "center";
        ctx.fillText(pop.text, pop.x, pop.y);
        ctx.globalAlpha = 1;
      }

      // 9. Draw Player Character (Silhouette Runner carrying Cine Camera)
      const px = p.x * dpr;
      const py = p.y;
      const pw = p.width * dpr;
      const ph = p.height * dpr;

      ctx.fillStyle = "#171D3B";

      // Head
      ctx.beginPath();
      ctx.arc(px + 14 * dpr, py + 9 * dpr, 6 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Torso
      ctx.fillRect(px + 9 * dpr, py + 15 * dpr, 10 * dpr, 16 * dpr);

      // Cine Camera Mounted on Shoulder
      ctx.fillStyle = "#226192";
      ctx.fillRect(px + 16 * dpr, py + 10 * dpr, 12 * dpr, 8 * dpr);
      // Lens barrel
      ctx.fillStyle = "#EF8557";
      ctx.fillRect(px + 28 * dpr, py + 12 * dpr, 5 * dpr, 4 * dpr);
      // Blinking Tally / Rec Dot
      ctx.fillStyle = Math.floor(time * 0.005) % 2 === 0 ? "#E53E3E" : "#722D37";
      ctx.beginPath();
      ctx.arc(px + 18 * dpr, py + 12 * dpr, 1.8 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Animated Running Legs
      ctx.strokeStyle = "#171D3B";
      ctx.lineWidth = 3 * dpr;
      ctx.lineCap = "round";

      if (p.isGrounded && eng.state === "playing") {
        const legPhase = Math.sin(p.runFrame);
        // Front leg
        ctx.beginPath();
        ctx.moveTo(px + 12 * dpr, py + 30 * dpr);
        ctx.lineTo(px + 12 * dpr + legPhase * 8 * dpr, py + 38 * dpr);
        ctx.lineTo(px + 14 * dpr + legPhase * 10 * dpr, py + ph);
        ctx.stroke();

        // Back leg
        ctx.beginPath();
        ctx.moveTo(px + 15 * dpr, py + 30 * dpr);
        ctx.lineTo(px + 15 * dpr - legPhase * 8 * dpr, py + 38 * dpr);
        ctx.lineTo(px + 17 * dpr - legPhase * 10 * dpr, py + ph);
        ctx.stroke();
      } else {
        // Jumping Pose (Legs tucked)
        ctx.beginPath();
        ctx.moveTo(px + 11 * dpr, py + 30 * dpr);
        ctx.lineTo(px + 7 * dpr, py + 37 * dpr);
        ctx.lineTo(px + 14 * dpr, py + 41 * dpr);
        ctx.moveTo(px + 16 * dpr, py + 30 * dpr);
        ctx.lineTo(px + 21 * dpr, py + 36 * dpr);
        ctx.lineTo(px + 17 * dpr, py + 41 * dpr);
        ctx.stroke();
      }

      eng.animId = requestAnimationFrame(loop);
    };

    engineRef.current.animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(engineRef.current.animId);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <section id="arcade" className="relative pt-8 sm:pt-12 pb-0 bg-transparent select-none w-full">
      {/* Top Header Row with Meta & Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2.5 sm:mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EF8557] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#226192] flex items-center gap-1.5">
            <Clapperboard size={13} className="text-[#226192]" />
            CINE Runner
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Controls Hint */}
          <span className="hidden md:inline text-[10px] font-mono text-[#226192]/65">
            SPACE / UP ARROW / TAP TO JUMP
          </span>

          {/* High Score Badge */}
          <div className="flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold text-[#226192]/80 bg-[#226192]/10 px-2.5 py-0.5 rounded-md border border-[#226192]/20">
            <Trophy size={11} className="text-[#EF8557]" />
            <span>BEST: {highScore}</span>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 sm:p-1.5 text-[#226192] hover:text-[#722D37] hover:bg-[#226192]/10 rounded-full transition-colors cursor-pointer"
            title={isMuted ? "Unmute audio" : "Mute audio"}
            aria-label="Toggle game audio"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {/* Full-Width Edge-to-Edge Arcade Track Container (Connected to Footer) */}
      <div
        ref={containerRef}
        onClick={jump}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            jump();
          }
        }}
        className="relative w-full h-[200px] sm:h-[225px] md:h-[245px] border-t border-[#226192]/20 overflow-hidden cursor-pointer group bg-[#FAF8F5] focus:outline-none"
      >
        {/* Main 2D Canvas spanning full viewport width */}
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Top HUD Overlay (Score & Current Rank) */}
        <div className="absolute top-3 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 bg-[#226192]/90 backdrop-blur-md text-[#FAF8F5] px-3 py-1 rounded-lg border border-white/20 text-[10px] sm:text-xs font-mono font-bold tracking-wider shadow-sm">
            <span className="text-[#EF8557]">SCORE:</span>
            <span className="min-w-[36px]">{score}</span>
          </div>

          <div className="hidden xs:flex items-center gap-1.5 bg-[#FAF8F5]/90 backdrop-blur-md text-[#226192] px-3 py-1 rounded-lg border border-[#226192]/25 text-[10px] sm:text-xs font-mono font-bold tracking-wider shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#226192]" />
            <span>ROLE: {currentRank}</span>
          </div>
        </div>

        {/* Start Screen Overlay */}
        {gameState === "idle" && (
          <div className="absolute inset-0 bg-[#171D3B]/45 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#EF8557] text-[#FAF8F5] flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-transform mb-2">
              <Play size={20} className="ml-0.5" />
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#FAF8F5] tracking-tight mb-1">
              ROLL CAMERA
            </h3>
            <p className="font-mono text-[11px] sm:text-xs text-[#FAF8F5]/85 tracking-wider">
              TAP OR PRESS <span className="underline font-bold text-[#EF8557]">SPACE</span> TO JUMP (DOUBLE JUMP ENABLED)
            </p>
          </div>
        )}

        {/* Game Over Screen Overlay */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-[#171D3B]/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-200">
            <span className="text-xs font-mono uppercase tracking-widest text-[#EF8557] font-bold mb-0.5">
              CUT! SCENE WRAPPED
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF8F5] tracking-tight mb-1">
              SCORE: {score}
            </h3>
            <p className="font-mono text-[11px] text-[#FAF8F5]/80 mb-3">
              ACHIEVED RANK: <span className="text-[#EF8557] font-bold">{currentRank}</span>
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="flex items-center gap-2 bg-[#FAF8F5] text-[#226192] px-5 py-2.5 rounded-full font-mono text-xs font-bold hover:bg-white hover:scale-105 active:scale-95 shadow-md transition-all cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>TAKE TWO (RESTART)</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CineRunner;
