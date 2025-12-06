import { useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from './Button';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = ({ id, title, description, variant = 'info', duration = 5000, onClose }: ToastProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const variants = {
    success: {
      icon: CheckCircle2,
      bg: 'bg-success/10 border-success/20',
      text: 'text-success',
      iconColor: 'text-success',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-destructive/10 border-destructive/20',
      text: 'text-destructive',
      iconColor: 'text-destructive',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-warning/10 border-warning/20',
      text: 'text-warning',
      iconColor: 'text-warning',
    },
    info: {
      icon: Info,
      bg: 'bg-info/10 border-info/20',
      text: 'text-info',
      iconColor: 'text-info',
    },
  };

  const { icon: Icon, bg, text, iconColor } = variants[variant];

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 shadow-lg',
        'animate-slide-up',
        bg
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn('h-5 w-5 shrink-0', iconColor)} />
      <div className="flex-1 min-w-0">
        {title && <p className={cn('text-sm font-semibold', text)}>{title}</p>}
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onClose(id)}
        className="h-6 w-6 shrink-0"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Toast;

