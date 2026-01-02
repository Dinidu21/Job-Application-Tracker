import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useTheme } from '../../contexts/ThemeContext';
import { logout } from '../../store/authSlice';
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Menu,
} from 'lucide-react';
import { Button } from '../ui';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuClick?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, className }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme, setTheme, actualTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'New application response', time: '2m ago', unread: true },
    { id: 2, title: 'Interview scheduled', time: '1h ago', unread: true },
    { id: 3, title: 'Profile viewed', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={`h-16 bg-background/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 ${className}`}>
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 pr-4 py-2 w-64 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <div className="hidden md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative overflow-hidden"
          >
            <motion.div
              initial={false}
              animate={{ rotate: actualTheme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {actualTheme === 'dark' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </motion.div>
          </Button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>

          {/* Notification Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <span className="text-xs text-muted-foreground">{unreadCount} new</span>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b border-white/5 hover:bg-white/5 transition-colors ${notification.unread ? 'bg-primary/5' : ''
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/10">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View all notifications
              </Button>
            </div>
          </div>
        </div>

        {/* User Menu */}
        <div className="relative group">
          <Button variant="ghost" className="flex items-center gap-3 p-2">
            <div className="relative">
              {user?.profileImage ? (
                <>
                  <img
                    src={`/uploads/${user.profileImage}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      // Fallback to default avatar if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = parent.querySelector('.fallback-avatar') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="fallback-avatar w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full items-center justify-center hidden">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </>
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
            </div>
          </Button>

          {/* User Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="p-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                {user?.profileImage ? (
                  <>
                    <img
                      src={`/uploads/${user.profileImage}`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        // Fallback to default avatar if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = parent.querySelector('.dropdown-fallback-avatar') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="dropdown-fallback-avatar w-10 h-10 bg-gradient-to-r from-primary to-purple-500 rounded-full items-center justify-center hidden">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-sm">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
              </div>
            </div>

            <div className="p-2">
              <Link to="/profile">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>

              <Link to="/settings">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </Link>

              <div className="border-t border-white/10 my-2" />

              <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-400 hover:bg-red-500/10" onClick={() => { dispatch(logout()); navigate('/login'); }}>
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
