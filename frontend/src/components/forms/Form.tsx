import React from 'react';
import { useForm, UseFormProps, UseFormReturn, FieldValues } from 'react-hook-form';
import { Form as UIForm, FormGroup, FormError } from '../ui/Form';
import Button from '../ui/Button';

interface FormProps<T extends FieldValues> extends UseFormProps<T> {
    children: (methods: UseFormReturn<T>) => React.ReactNode;
    onSubmit: (data: T) => void | Promise<void>;
    submitText?: string;
    isLoading?: boolean;
    className?: string;
}

const Form = <T extends FieldValues>({ children, onSubmit, submitText = 'Submit', isLoading = false, className = '', ...formProps }: FormProps<T>) => {
    const methods = useForm<T>(formProps);

    const handleSubmit = async (data: T) => {
        await onSubmit(data);
    };

    return (
        <UIForm onSubmit={methods.handleSubmit(handleSubmit)} className={`space-y-4 ${className}`}>
            {children(methods)}
            <Button type="submit" disabled={isLoading} fullWidth>
                {isLoading ? 'Processing...' : submitText}
            </Button>
        </UIForm>
    );
};

interface FormFieldProps {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    children?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, id, type = 'text', placeholder, required = false, error, children }) => {
    return (
        <FormGroup>
            <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}{required && <span className="text-red-500">*</span>}
            </label>
            {children || (
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            )}
            {error && <FormError>{error}</FormError>}
        </FormGroup>
    );
};

export default Form;