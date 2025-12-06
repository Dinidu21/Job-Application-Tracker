import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { setCredentials } from '../store/authSlice';
import axiosInstance from '../api/axiosInstance';

const AuthCallback = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const handleCallback = async () => {
            const token = searchParams.get('token');
            if (token) {
                try {
                    // Set the token temporarily for the API call
                    localStorage.setItem('token', token);

                    // Fetch user info
                    const response = await axiosInstance.get('/auth/me');
                    const user = response.data.user;

                    // Set credentials with both token and user
                    dispatch(setCredentials({ token, user }));
                    navigate('/dashboard', { replace: true });
                } catch (error) {
                    console.error('Failed to get user info:', error);
                    localStorage.removeItem('token');
                    navigate('/login', { replace: true });
                }
            } else {
                // Handle error - redirect to login
                navigate('/login', { replace: true });
            }
        };

        handleCallback();
    }, [dispatch, navigate, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
};

export default AuthCallback;
