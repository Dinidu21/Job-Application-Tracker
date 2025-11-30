import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { User } from 'lucide-react';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'default' | 'lg';
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'default', ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8 text-xs',
      default: 'h-10 w-10 text-sm',
      lg: 'h-16 w-16 text-lg',
    };

    const displayText = fallback
      ? fallback
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : null;

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted',
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || ''} className="h-full w-full object-cover" />
        ) : displayText ? (
          <span className="font-medium text-muted-foreground">{displayText}</span>
        ) : (
          <User className="h-1/2 w-1/2 text-muted-foreground" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;

