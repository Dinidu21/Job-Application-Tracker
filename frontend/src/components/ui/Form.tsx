import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '../../utils/cn';

const Form = forwardRef<HTMLFormElement, HTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => (
    <form ref={ref} className={cn('space-y-6', className)} {...props} />
  )
);
Form.displayName = 'Form';

const FormGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  )
);
FormGroup.displayName = 'FormGroup';

const FormLabel = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
      {...props}
    />
  )
);
FormLabel.displayName = 'FormLabel';

const FormError = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm font-medium text-destructive', className)}
      role="alert"
      {...props}
    />
  )
);
FormError.displayName = 'FormError';

const FormHelper = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);
FormHelper.displayName = 'FormHelper';

export { Form, FormGroup, FormLabel, FormError, FormHelper };

