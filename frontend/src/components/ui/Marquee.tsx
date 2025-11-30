import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
}

const Marquee = ({
  children,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
  ...props
}: MarqueeProps) => {
  const speedClasses = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast',
  };

  return (
    <div
      className={cn('overflow-hidden', className)}
      {...props}
    >
      <div
        className={cn(
          'flex gap-8',
          direction === 'left' ? speedClasses[speed] : `animate-marquee-reverse ${speedClasses[speed]}`,
          pauseOnHover && 'hover:[animation-play-state:paused]',
          '[&>*]:flex [&>*]:shrink-0 [&>*]:gap-8'
        )}
      >
        {/* Duplicate content for seamless loop */}
        <div className="flex shrink-0 gap-8">
          {children}
        </div>
        <div className="flex shrink-0 gap-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;

