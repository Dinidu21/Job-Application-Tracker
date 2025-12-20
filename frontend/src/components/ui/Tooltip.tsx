import { ReactNode, useState } from 'react';
import { cn } from '../../utils/cn';

export interface TooltipProps {
    content: string;
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

const Tooltip = ({
    content,
    children,
    position = 'top',
    className
}: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={cn(
                        'absolute z-50 px-3 py-2 text-sm text-foreground bg-popover border border-border rounded-md shadow-md whitespace-nowrap pointer-events-none',
                        positionClasses[position],
                        className
                    )}
                >
                    {content}
                    {/* Arrow */}
                    <div
                        className={cn(
                            'absolute w-2 h-2 bg-popover border border-border transform rotate-45',
                            {
                                'top-full left-1/2 transform -translate-x-1/2 -mt-1 border-t-0 border-l-0': position === 'top',
                                'bottom-full left-1/2 transform -translate-x-1/2 -mb-1 border-b-0 border-r-0': position === 'bottom',
                                'left-full top-1/2 transform -translate-y-1/2 -ml-1 border-l-0 border-b-0': position === 'right',
                                'right-full top-1/2 transform -translate-y-1/2 -mr-1 border-r-0 border-t-0': position === 'left',
                            }
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default Tooltip;