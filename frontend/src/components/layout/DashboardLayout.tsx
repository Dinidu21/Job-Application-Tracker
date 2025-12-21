import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '../../utils/cn';

interface DashboardLayoutProps {
    children: React.ReactNode;
    className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, className }) => {
    const [sidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                        <motion.div
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="absolute left-0 top-0 h-full"
                        >
                            <Sidebar />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block fixed left-0 top-0 z-40">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className={cn(
                'transition-all duration-300 ease-in-out',
                'lg:ml-0', // Will be updated based on sidebar state
                sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
            )}>
                {/* Header */}
                <Header
                    onMenuClick={() => setMobileMenuOpen(true)}
                    className="sticky top-0 z-30"
                />

                {/* Page Content */}
                <main className={cn(
                    'min-h-[calc(100vh-4rem)] p-6',
                    className
                )}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;