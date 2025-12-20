import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { LogOut, Briefcase, Plus, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/dashboard"
            className="group flex items-center gap-3 text-xl font-bold transition-all duration-200 hover:scale-105"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20 transition-all duration-200 group-hover:shadow-xl group-hover:shadow-primary/30">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary 
                            bg-clip-text text-transparent 
                            animate-gradient-x bg-[length:200%_auto]">
              JobPath
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              to="/applications/new"
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                <span>New Application</span>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>

            <div className="ml-2 flex items-center gap-3">
              <ThemeToggle />
              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-3 py-2 backdrop-blur-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
