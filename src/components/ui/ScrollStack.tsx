import React, { useEffect, useRef, ReactNode } from 'react';
import './ScrollStack.css';

interface ScrollStackItemProps {
    children: ReactNode;
    itemClassName?: string;
    style?: React.CSSProperties;
}

export const ScrollStackItem = ({ children, itemClassName = '', style }: ScrollStackItemProps) => (
    <div className={`scroll-stack-card-wrapper ${itemClassName}`.trim()} style={style}>
        {children}
    </div>
);

interface ScrollStackProps {
    children: ReactNode;
    className?: string;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
}

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 40,
    itemScale = 0.05,
    itemStackDistance = 20,
}: ScrollStackProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const cards = containerRef.current.querySelectorAll('.scroll-stack-card-wrapper');

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const stickyTop = 150 + index * itemStackDistance;

                // A more robust way to measure scroll progress:
                // We find out where this card is located within the entire document flow.
                // We use getBoundingClientRect().top + window.scrollY to get absolute page offset.
                // The element starts sticking when window.scrollY reaches (absoluteTop - stickyTop).
                // But we ONLY want it to blur and scale when the NEXT card starts pushing up over it.
                // The next card will hit its sticky point approximately `40vh` after this card does,
                // because we added a 40vh margin-bottom to each card wrapper.

                const cardHeight = rect.height || 400;

                // If it's the last card, it should never blur.
                const isLast = index === cards.length - 1;

                // Rect.top gets stuck at stickyTop. 
                // We can see how far we've over-scrolled by looking at how negative (rect.top - stickyTop) *would* be
                // if position wasn't sticky... Oh wait, sticky fixes rect.top.
                // We must use the container or the parent element offsets!

                // Let's use the wrapper's top relative to the viewport.
                // If it equals stickyTop, it's pinned.
                // How far is the user scrolling WHILE it's pinned? 
                // We can look at the element's top position before sticky takes over.
                // HTMLElement.offsetTop gives top position relative to offsetParent.
                const offsetTop = (card as HTMLElement).offsetTop;
                // offsetParent is likely the `.flex.flex-col.relative` container.
                // Get the container's absolute top relative to the page:
                const containerAbsoluteTop = (containerRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;

                const cardAbsoluteTop = containerAbsoluteTop + offsetTop;

                // The point at which THIS card becomes sticky
                const stickStartScroll = cardAbsoluteTop - stickyTop;

                // The point at which the NEXT card becomes sticky (roughly stickStartScroll + 40vh for the margin + card height)
                // Let's just use a fixed scroll distance for the transition, e.g., 400px of scrolling AFTER it hits the sticky point.

                const scrollPassedStickPoint = window.scrollY - stickStartScroll;

                if (scrollPassedStickPoint > 0 && !isLast) {
                    // Only start blurring when the user scrolls down further by e.g. 50px
                    const transitionStart = 50;
                    const transitionEnd = cardHeight;

                    let progress = 0;
                    if (scrollPassedStickPoint > transitionStart) {
                        progress = Math.min(1, (scrollPassedStickPoint - transitionStart) / transitionEnd);
                    }

                    const scale = 1 - (progress * itemScale * 2);

                    const innerChild = (card as HTMLElement).firstElementChild as HTMLElement;
                    if (innerChild) {
                        innerChild.style.transform = `scale(${scale})`;
                        innerChild.style.opacity = progress > 0.8 ? `${1 - (progress - 0.8) * 2}` : `1`;
                    }
                } else {
                    const innerChild = (card as HTMLElement).firstElementChild as HTMLElement;
                    if (innerChild) {
                        innerChild.style.transform = `scale(1)`;
                        innerChild.style.opacity = `1`;
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial call
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [itemStackDistance, itemScale]);

    return (
        <div className={`relative w-full ${className}`.trim()} ref={containerRef}>
            <div className="flex flex-col relative">
                {React.Children.map(children, (child, index) => {
                    if (React.isValidElement(child)) {
                        const isLast = index === React.Children.count(children) - 1;
                        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
                            style: { marginBottom: isLast ? '0px' : '40vh' }
                        });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};

export default ScrollStack;
