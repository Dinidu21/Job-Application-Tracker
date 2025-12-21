import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProfileForm from '../components/ProfileForm';
import { User, Camera, Shield, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Profile Page Component
 *
 * Dedicated page for user profile management with photo upload functionality.
 * Provides a clean, focused interface for updating user information and profile picture.
 */
const Profile: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 mb-6">
                        <User className="h-4 w-4 animate-pulse-glow" />
                        <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            Profile Management
                        </span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                        <span className="block bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                            Your Profile
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Keep your profile up to date and showcase your professional journey
                    </p>
                </motion.div>

                {/* Profile Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <ProfileForm />
                </motion.div>

                {/* Additional Settings Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* Privacy Settings */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
                                    <Shield className="h-5 w-5 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Privacy</h3>
                                    <p className="text-sm text-muted-foreground">Control your data</p>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4">
                                Manage your privacy settings and data sharing preferences.
                            </p>

                            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                Manage Privacy →
                            </button>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                                    <Bell className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Notifications</h3>
                                    <p className="text-sm text-muted-foreground">Stay updated</p>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4">
                                Configure how and when you receive notifications.
                            </p>

                            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                Notification Settings →
                            </button>
                        </div>
                    </div>

                    {/* Photo Tips */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                                    <Camera className="h-5 w-5 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Photo Tips</h3>
                                    <p className="text-sm text-muted-foreground">Professional photos</p>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4">
                                Learn how to take professional profile photos that stand out.
                            </p>

                            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                                View Tips →
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;