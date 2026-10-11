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
    itemScale = 0.04,
    itemStackDistance = 20,
}: ScrollStackProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const cards = containerRef.current.querySelectorAll('.scroll-stack-card-wrapper');
            const baseTop = Math.max(window.innerHeight * 0.12, 90);

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const stackOffset = Math.min(index * itemStackDistance, 180);
                const stickyTop = baseTop + stackOffset;

                const cardHeight = rect.height || 400;
                const isLast = index === cards.length - 1;

                const offsetTop = (card as HTMLElement).offsetTop;
                const containerAbsoluteTop = (containerRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
                const cardAbsoluteTop = containerAbsoluteTop + offsetTop;

                const stickStartScroll = cardAbsoluteTop - stickyTop;
                const scrollPassedStickPoint = window.scrollY - stickStartScroll;

                if (scrollPassedStickPoint > 0 && !isLast) {
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
                        innerChild.style.opacity = progress > 0.85 ? `${1 - (progress - 0.85) * 2.5}` : `1`;
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
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [itemStackDistance, itemScale]);

    const totalCount = React.Children.count(children);

    return (
        <div className={`relative w-full ${className}`.trim()} ref={containerRef}>
            <div className="flex flex-col relative">
                {React.Children.map(children, (child, index) => {
                    if (React.isValidElement(child)) {
                        const isLast = index === totalCount - 1;
                        const stackOffset = Math.min(index * itemStackDistance, 180);
                        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
                            style: {
                                zIndex: 10 + index,
                                top: `calc(12vh + ${stackOffset}px)`,
                                marginBottom: isLast ? '60px' : '38vh',
                                ...((child.props as { style?: React.CSSProperties }).style || {})
                            }
                        });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};

export default ScrollStack;
