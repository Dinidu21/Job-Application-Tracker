import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { Plus, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';
import Avatar from './ui/Avatar';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="group flex items-center gap-3 text-xl font-bold transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
            aria-label="Job Tracker - Home"
          >
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary 
                            bg-clip-text text-transparent 
                            animate-gradient-x bg-[length:200%_auto]">
              JobPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="default" size="default">
              <Link to="/applications/new">
                <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                New Application
              </Link>
            </Button>

            <div className="ml-2 flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-3 py-2 backdrop-blur-sm">
              <ThemeToggle />
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar
                  src={user?.profileImage ? `/uploads/${user.profileImage}` : undefined}
                  fallback={user?.name || 'U'}
                  size="sm"
                  className="cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">{user?.name}</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                <span className="hidden lg:inline">Logout</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t border-border/40 py-4 animate-slide-up"
            role="menu"
          >
            <div className="flex flex-col gap-3">
              <Button asChild variant="default" fullWidth className="justify-start">
                <Link to="/applications/new" onClick={() => setMobileMenuOpen(false)}>
                  <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                  New Application
                </Link>
              </Button>
              <div className="flex items-center justify-between px-2 py-2">
                <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
                  <Avatar
                    src={user?.profileImage ? `/uploads/${user.profileImage}` : undefined}
                    fallback={user?.name || 'U'}
                    size="sm"
                    className="cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground">{user?.name}</span>
                </Link>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

