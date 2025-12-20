import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { login } from '../../../store/authSlice';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Form, FormGroup, FormError } from '../../../components/ui/Form';
import { LoginCredentials } from '../../../types/user';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    await dispatch(login(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormGroup>
        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Email
        </label>
        <Input
          id="email"
          placeholder="Enter your email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </FormGroup>
      
      <FormGroup>
        <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <FormError>{errors.password.message}</FormError>}
      </FormGroup>

      {error && <FormError>{error}</FormError>}

      <Button type="submit" disabled={loading} fullWidth>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Form>
  );
};

export default LoginForm;