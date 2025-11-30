import React, { useEffect, useState } from 'react';

interface CursorPosition {
    x: number;
    y: number;
}

const CustomCursor: React.FC = () => {
    const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [trailPosition, setTrailPosition] = useState<CursorPosition>({ x: 0, y: 0 });

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            const newX = e.clientX;
            const newY = e.clientY;

            setCursorPosition({ x: newX, y: newY });

            // Update CSS custom properties for ambient glow effects
            document.documentElement.style.setProperty('--mouse-x', `${newX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${newY}px`);

            // Smooth trail following
            setTrailPosition(prev => ({
                x: prev.x + (newX - prev.x) * 0.1,
                y: prev.y + (newY - prev.y) * 0.1,
            }));
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.classList.contains('cursor-glow') ||
                target.classList.contains('hover-glow') ||
                target.classList.contains('magnetic-hover') ||
                target.classList.contains('btn-hover') ||
                target.classList.contains('card-hover') ||
                target.classList.contains('interactive-hover') ||
                target.classList.contains('link-hover') ||
                target.classList.contains('magnetic') ||
                target.classList.contains('scale-hover') ||
                target.classList.contains('float-hover') ||
                target.classList.contains('rotate-hover') ||
                target.classList.contains('cursor-ring') ||
                target.closest('button') ||
                target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        // Initialize mouse position to center
        setCursorPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        setTrailPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

        document.addEventListener('mousemove', updateCursorPosition);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            document.removeEventListener('mousemove', updateCursorPosition);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Ambient Glow Background */}
            <div className="ambient-glow" />

            {/* Enhanced Cursor Dot */}
            <div
                className={`enhanced-cursor-dot ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: cursorPosition.x - 6, // Center the 12px/16px dot
                    top: cursorPosition.y - 6,
                }}
            />

            {/* Enhanced Cursor Ring */}
            <div
                className={`enhanced-cursor-ring ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: cursorPosition.x - 20, // Center the 40px/60px ring
                    top: cursorPosition.y - 20,
                }}
            />

            {/* Cursor Trail */}
            <div
                className={`enhanced-cursor-trail ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: trailPosition.x - 40, // Center the 80px/100px trail
                    top: trailPosition.y - 40,
                }}
            />
        </>
    );
};

export default CustomCursor;