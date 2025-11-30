import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from './ui/Button';

const ThemeToggle = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative"
    >
      <Sun
        className={`absolute h-5 w-5 text-yellow-500 transition-all duration-300 ${
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100'
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute h-5 w-5 text-blue-400 transition-all duration-300 ${
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
