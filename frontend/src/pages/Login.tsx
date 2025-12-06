import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { login } from '../store/authSlice';
import { Briefcase, Mail, Lock } from 'lucide-react';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui';
import ThemeToggle from '../components/ThemeToggle';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [focused, setFocused] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/20 to-primary/20 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        <Card variant="glass">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-purple-600 shadow-lg shadow-primary/30">
              <Briefcase className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to continue tracking your job applications
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {error && (
                <div
                  className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive backdrop-blur-sm"
                  role="alert"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-destructive" aria-hidden="true" />
                    {error}
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <Input
                  id="email"
                  type="email"
                  label="Email address"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused({ ...focused, email: true })}
                  onBlur={() => setFocused({ ...focused, email: false })}
                  leftIcon={<Mail className="h-5 w-5" />}
                  error={focused.email && !formData.email ? 'Email is required' : undefined}
                />

                <Input
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocused({ ...focused, password: true })}
                  onBlur={() => setFocused({ ...focused, password: false })}
                  leftIcon={<Lock className="h-5 w-5" />}
                  error={focused.password && !formData.password ? 'Password is required' : undefined}
                />
              </div>

              <Button
                type="submit"
                fullWidth
                isLoading={loading}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link
                  to="/register"
                  className="font-semibold text-primary transition-all duration-200 hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                >
                  Sign up for free
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
