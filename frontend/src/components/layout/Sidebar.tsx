import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    User,
    Settings,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    TrendingUp,
    Target,
    Bell,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SidebarProps {
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);

    const navigationItems = [
        {
            name: 'Dashboard',
            href: '/',
            icon: LayoutDashboard,
            description: 'Overview & Analytics',
        },
        {
            name: 'Applications',
            href: '/applications',
            icon: FileText,
            description: 'Manage Applications',
        },
        {
            name: 'Analytics',
            href: '/analytics',
            icon: BarChart3,
            description: 'Detailed Insights',
        },
        {
            name: 'AI Insights',
            href: '/insights',
            icon: Sparkles,
            description: 'Smart Recommendations',
        },
        {
            name: 'Profile',
            href: '/profile',
            icon: User,
            description: 'Account Settings',
        },
    ];

    const quickStats = [
        { label: 'Active Apps', value: '12', trend: '+2', color: 'text-blue-500' },
        { label: 'Success Rate', value: '23%', trend: '+5%', color: 'text-green-500' },
        { label: 'This Week', value: '3', trend: '+1', color: 'text-purple-500' },
    ];

    return (
        <motion.div
            initial={{ width: 280 }}
            animate={{ width: isCollapsed ? 80 : 280 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={cn(
                'relative h-screen bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl border-r border-white/10 flex flex-col',
                className
            )}
        >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <AnimatePresence mode="wait">
                        {!isCollapsed ? (
                            <motion.div
                                key="expanded"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center gap-3"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-xl blur opacity-50" />
                                    <div className="relative w-10 h-10 bg-gradient-to-r from-primary to-purple-500 rounded-xl flex items-center justify-center">
                                        <Target className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-lg bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                        JobPath
                                    </div>
                                    <div className="text-xs text-muted-foreground">AI-Powered</div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="collapsed"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex justify-center"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-lg blur opacity-50" />
                                    <div className="relative w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center">
                                        <Target className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <div className="space-y-2">
                    {navigationItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    'relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group',
                                    isActive
                                        ? 'bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30'
                                        : 'hover:bg-white/5'
                                )}
                            >
                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary to-purple-500 rounded-r-full" />
                                )}

                                <div className={cn(
                                    'flex items-center justify-center w-8 h-8 rounded-lg transition-colors',
                                    isActive
                                        ? 'bg-gradient-to-r from-primary to-purple-500 text-white'
                                        : 'text-muted-foreground group-hover:text-primary'
                                )}>
                                    <Icon className="h-4 w-4" />
                                </div>

                                <AnimatePresence mode="wait">
                                    {!isCollapsed && (
                                        <motion.div
                                            key="expanded-content"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="flex-1 min-w-0"
                                        >
                                            <div className="font-medium text-sm">{item.name}</div>
                                            <div className="text-xs text-muted-foreground truncate">
                                                {item.description}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Quick Stats */}
            {!isCollapsed && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 border-t border-white/10"
                >
                    <div className="text-xs font-medium text-muted-foreground mb-3">Quick Stats</div>
                    <div className="space-y-2">
                        {quickStats.map((stat, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{stat.label}</span>
                                <div className="flex items-center gap-1">
                                    <span className="font-medium">{stat.value}</span>
                                    <span className={cn('text-xs', stat.color)}>{stat.trend}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* User Profile */}
            <div className="p-4 border-t border-white/10">
                <Link
                    to="/profile"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                    <div className="relative">
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-8 h-8 rounded-full object-cover border-2 border-primary/30"
                            />
                        ) : (
                            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                            </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    </div>

                    <AnimatePresence mode="wait">
                        {!isCollapsed && (
                            <motion.div
                                key="user-info"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex-1 min-w-0"
                            >
                                <div className="font-medium text-sm truncate">{user?.name}</div>
                                <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Link>
            </div>
        </motion.div>
    );
};

export default Sidebar;