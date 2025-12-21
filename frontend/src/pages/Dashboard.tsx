import { useEffect, useState, useRef } from 'react';
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
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
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
  Sparkle,
  Brain,
  Activity,
  Clock,
  Users,
} from 'lucide-react';
import { EmptyState, Button, Input, Select, Badge, Tooltip } from '../components/ui';
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

// AI Insights Component
const AIInsights = () => {
  const insights = [
    {
      type: 'success',
      title: 'Great Progress!',
      message: 'Your application rate has increased by 25% this week. Keep it up!',
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
    },
    {
      type: 'tip',
      title: 'Pro Tip',
      message: 'Companies in tech respond 40% faster. Consider focusing more applications there.',
      icon: Sparkle,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      type: 'warning',
      title: 'Response Time Alert',
      message: '3 applications haven\'t received responses in 14+ days. Consider following up.',
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <Brain className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg">AI Insights</h3>
            <p className="text-sm text-muted-foreground">Smart recommendations for your job search</p>
          </div>
        </div>

        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-r ${insight.color} flex-shrink-0`}>
                <insight.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Activity Feed Component
const ActivityFeed = () => {
  const activities = [
    { type: 'application', message: 'Applied to Senior Developer at TechCorp', time: '2 hours ago', status: 'applied' },
    { type: 'interview', message: 'Interview scheduled with StartupXYZ', time: '1 day ago', status: 'interview' },
    { type: 'response', message: 'Received response from DevAgency', time: '2 days ago', status: 'rejected' },
    { type: 'application', message: 'Applied to Full Stack Developer at BigTech', time: '3 days ago', status: 'applied' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application': return FileText;
      case 'interview': return Users;
      case 'response': return AlertCircle;
      default: return Activity;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'applied': return 'text-blue-500';
      case 'interview': return 'text-yellow-500';
      case 'rejected': return 'text-red-500';
      case 'offer': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
            <Activity className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Your latest job search updates</p>
          </div>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className={`p-1.5 rounded-lg bg-white/10 ${getActivityColor(activity.status)}`}>
                  <Icon className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
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

// Main Dashboard Component
const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { applications, loading, filters } = useSelector(
    (state: RootState) => state.applications
  );

  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>(filters.status || 'all');
  const [viewMode, setViewMode] = useState<'cards' | 'kanban'>('cards');
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'applications'>('overview');

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'applications', label: 'Applications', icon: FileText },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'hover:bg-white/10'
                  }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Welcome Section */}
              <div className="text-center py-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 mb-6">
                    <Brain className="h-4 w-4 animate-pulse-glow" />
                    <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                      AI-Powered Dashboard
                    </span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    <span className="block bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                      Welcome back!
                    </span>
                  </h1>

                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Your job search journey is looking great. Here's what's happening with your applications.
                  </p>
                </motion.div>
              </div>

              {/* Overview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Insights */}
                <div className="lg:col-span-1">
                  <AIInsights />
                </div>

                {/* Activity Feed */}
                <div className="lg:col-span-1">
                  <ActivityFeed />
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                          <Rocket className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Quick Actions</h3>
                          <p className="text-sm text-muted-foreground">Get started fast</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button asChild className="w-full justify-start gap-3">
                          <Link to="/applications/new">
                            <Plus className="h-4 w-4" />
                            New Application
                          </Link>
                        </Button>

                        <Button variant="outline" asChild className="w-full justify-start gap-3">
                          <Link to="/analytics">
                            <BarChart3 className="h-4 w-4" />
                            View Analytics
                          </Link>
                        </Button>

                        <Button variant="outline" asChild className="w-full justify-start gap-3">
                          <Link to="/profile">
                            <Users className="h-4 w-4" />
                            Update Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AnalyticsDashboard />
            </motion.div>
          )}

          {activeTab === 'applications' && (
            <motion.div
              key="applications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Control Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-xl border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur opacity-50" />
                    <Button
                      asChild
                      className="relative bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary border-0 shadow-lg"
                    >
                      <Link to="/applications/new">
                        <Plus className="mr-2 h-5 w-5" />
                        New Application
                      </Link>
                    </Button>
                  </div>

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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;