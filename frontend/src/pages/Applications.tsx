import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import {
    fetchApplications,
    fetchStats,
    setFilters,
    deleteApplication,
} from '../store/applicationSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getStatusGradient } from '../utils/statusColors';
import { Application, ApplicationStatus } from '../types/application';
import { format } from 'date-fns';
import {
    Search,
    Trash2,
    Edit,
    Eye,
    Calendar,
    MapPin,
    DollarSign,
    TrendingUp,
    FileText,
    Sparkles,
    Plus,
    Layers,
    BarChart3,
    Building,
    Target,
    AlertCircle,
    Rocket,
    Trophy,
    Network,
    Sparkle,
    Brain,
    Activity,
    Clock,
    Users,
} from 'lucide-react';
import { EmptyState, Button, Input, Select, Badge, Progress, Tooltip } from '../components/ui';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// 3D Tilt Card Component
const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`transition-shadow duration-300 ${className}`}
        >
            {children}
        </motion.div>
    );
};

// Holographic Application Card
const HolographicCard = ({
    app,
    onDelete,
    index
}: {
    app: Application;
    onDelete: (id: string) => void;
    index: number;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const statusGradient = getStatusGradient(app.status);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <TiltCard className="relative overflow-hidden rounded-2xl">
                {/* Holographic effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${statusGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]" />
                </div>

                <div className="relative bg-gradient-to-br from-background/90 to-background/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-xl blur" />
                                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center">
                                    <Building className="h-7 w-7 text-primary" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    {app.company}
                                    {app.isFavorite && (
                                        <Sparkle className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                                    )}
                                </h3>
                                <p className="text-muted-foreground">{app.position}</p>
                            </div>
                        </div>

                        <Badge className={`bg-gradient-to-r ${statusGradient} text-white border-0`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            {app.location && (
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-blue-400" />
                                    <span>{app.location}</span>
                                </div>
                            )}
                            {app.appliedDate && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-purple-400" />
                                    <span>{format(new Date(app.appliedDate), 'MMM dd')}</span>
                                </div>
                            )}
                            {app.salary && (
                                <div className="flex items-center gap-2 text-sm">
                                    <DollarSign className="h-4 w-4 text-green-400" />
                                    <span className="font-medium">{app.salary}</span>
                                </div>
                            )}
                        </div>

                        {app.notes && (
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg" />
                                <p className="text-sm text-muted-foreground relative p-3 rounded-lg bg-white/5">
                                    {app.notes}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Actions - Appear on hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-white/10"
                            >
                                <Tooltip content="View">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 w-9 rounded-full bg-white/5 hover:bg-primary/20"
                                    >
                                        <Link to={`/applications/${app._id}`}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </Tooltip>

                                <Tooltip content="Edit">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 w-9 rounded-full bg-white/5 hover:bg-blue-500/20"
                                    >
                                        <Link to={`/applications/${app._id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </Tooltip>

                                <Tooltip content="Delete">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDelete(app._id)}
                                        className="h-9 w-9 rounded-full bg-white/5 hover:bg-destructive/20 text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </Tooltip>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </TiltCard>
        </motion.div>
    );
};

// Main Applications Component
const Applications: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { applications, stats, loading, filters } = useSelector(
        (state: RootState) => state.applications
    );

    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>(filters.status || 'all');
    const [viewMode, setViewMode] = useState<'cards' | 'kanban'>('cards');

    useEffect(() => {
        dispatch(fetchStats());
        dispatch(fetchApplications(filters));
    }, [dispatch]);

    useEffect(() => {
        const newFilters = {
            ...filters,
            search: searchTerm || undefined,
            status: statusFilter !== 'all' ? statusFilter : undefined,
        };
        dispatch(setFilters(newFilters));
        dispatch(fetchApplications(newFilters));
    }, [searchTerm, statusFilter]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            await dispatch(deleteApplication(id));
            dispatch(fetchStats());
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent">
                            Applications
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage and track all your job applications
                        </p>
                    </div>

                    <Button asChild className="group relative overflow-hidden">
                        <Link to="/applications/new">
                            <span className="relative z-10 flex items-center">
                                <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
                                New Application
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 group-hover:from-purple-600 group-hover:to-primary transition-all duration-300" />
                        </Link>
                    </Button>
                </div>

                {/* Control Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-xl border border-white/10"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`px-4 ${viewMode === 'cards' ? 'bg-primary/20 text-primary' : ''}`}
                                onClick={() => setViewMode('cards')}
                            >
                                <Layers className="h-4 w-4 mr-2" />
                                Cards
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`px-4 ${viewMode === 'kanban' ? 'bg-primary/20 text-primary' : ''}`}
                                onClick={() => setViewMode('kanban')}
                            >
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Kanban
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search applications..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white/5 border-white/10 w-64"
                            />
                        </div>

                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
                            options={[
                                { value: 'all', label: 'All Status' },
                                { value: 'applied', label: 'Applied' },
                                { value: 'interview', label: 'Interview' },
                                { value: 'offer', label: 'Offer' },
                                { value: 'rejected', label: 'Rejected' },
                            ]}
                            className="bg-white/5 border-white/10"
                        />
                    </div>
                </motion.div>

                {/* Applications Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-48 animate-pulse rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
                        ))}
                    </div>
                ) : applications.length === 0 ? (
                    <EmptyState
                        icon={Sparkles}
                        title="No applications yet"
                        description="Start your journey to landing your dream job"
                        action={
                            <Button asChild className="group relative overflow-hidden">
                                <Link to="/applications/new">
                                    <span className="relative z-10 flex items-center">
                                        <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
                                        Create First Application
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 group-hover:from-purple-600 group-hover:to-primary transition-all duration-300" />
                                </Link>
                            </Button>
                        }
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {applications.map((app, index) => (
                                <HolographicCard
                                    key={app._id}
                                    app={app}
                                    onDelete={handleDelete}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Applications;