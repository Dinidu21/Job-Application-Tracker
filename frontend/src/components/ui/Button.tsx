import { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      isLoading = false,
      fullWidth = false,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild && typeof children === 'object' && children !== null && 'type' in children) {
      const child = children as ReactElement;
      return (
        <child.type
          {...child.props}
          className={cn(
            'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            variant === 'default' && 'bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-md active:scale-[0.98]',
            variant === 'destructive' && 'bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 hover:shadow-md active:scale-[0.98]',
            variant === 'outline' && 'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
            variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]',
            variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
            variant === 'link' && 'text-primary underline-offset-4 hover:underline',
            size === 'default' && 'h-10 px-4 py-2 text-sm',
            size === 'sm' && 'h-9 px-3 text-sm',
            size === 'lg' && 'h-11 px-8 text-base',
            size === 'icon' && 'h-10 w-10',
            fullWidth && 'w-full',
            className,
            child.props.className
          )}
        />
      );
    }
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      default:
        'bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-md active:scale-[0.98]',
      destructive:
        'bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 hover:shadow-md active:scale-[0.98]',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]',
      ghost: 'hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
      link: 'text-primary underline-offset-4 hover:underline',
    };

    const sizes = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-9 px-3 text-sm',
      lg: 'h-11 px-8 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

