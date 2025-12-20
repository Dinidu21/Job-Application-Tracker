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
import Navbar from '../components/Navbar';
import { getStatusGradient } from '../utils/statusColors';
import { Application, ApplicationStatus, ApplicationStats } from '../types/application';
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
  BarChart3,
  Award,
  Building,
  Layers,
  Star,
  AlertCircle,
  Rocket,
  Trophy,
  Network,
  Sparkle,
  Brain,
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

// Animated Gradient Mesh Background
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
    <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse-slow delay-500" />

    {/* Animated grid */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '50px 50px',
      }}
    />

    {/* Floating particles */}
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-primary/30 rounded-full animate-particle-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${15 + Math.random() * 10}s`,
        }}
      />
    ))}
  </div>
);

// Hero Stats Component
const HeroStats = ({ stats }: { stats: ApplicationStats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-12"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5 rounded-3xl blur-xl" />

      <div className="relative bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 mb-6">
                <Brain className="h-4 w-4 animate-pulse-glow" />
                <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  AI-Powered Career Insights
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                <span className="block bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                  Career Dashboard
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Transform your job search with intelligent tracking, predictive analytics, and AI-driven insights.
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-xl blur opacity-50" />
                    <div className="relative bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats?.byStatus.offer || 0}</div>
                    <div className="text-sm text-muted-foreground">Offers</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-50" />
                    <div className="relative bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <Rocket className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats?.byStatus.interview || 0}</div>
                    <div className="text-sm text-muted-foreground">Interviews</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50" />
                    <div className="relative bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <Network className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats?.total || 0}</div>
                    <div className="text-sm text-muted-foreground">Total Applications</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* AI Assistant Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:w-1/3"
          >
            <TiltCard>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur" />
                      <div className="relative w-12 h-12 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">AI Assistant</div>
                      <div className="text-sm text-muted-foreground">Ready to help</div>
                    </div>
                  </div>

                  <p className="text-sm mb-4">
                    "Your success rate improved by <span className="font-bold text-primary">15%</span> this week!
                    Keep up the momentum."
                  </p>

                  <Button
                    className="w-full group"
                    variant="outline"
                  >
                    <Sparkle className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform" />
                    Get Personalized Tips
                  </Button>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Add this component
const LiveMetrics = () => (
  <div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />
    <canvas id="metricsChart" className="relative z-10" />
  </div>
);

// Interactive Stats Dashboard
const StatsDashboard = ({ stats }: { stats: ApplicationStats }) => {
  const [activeStat, setActiveStat] = useState('overview');

  const metrics = [
    { key: 'applied', label: 'Applied', value: stats?.byStatus.applied || 0, color: 'from-blue-500 to-cyan-500' },
    { key: 'interview', label: 'Interview', value: stats?.byStatus.interview || 0, color: 'from-yellow-500 to-orange-500' },
    { key: 'offer', label: 'Offer', value: stats?.byStatus.offer || 0, color: 'from-green-500 to-emerald-500' },
    { key: 'rejected', label: 'Rejected', value: stats?.byStatus.rejected || 0, color: 'from-red-500 to-pink-500' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TiltCard>
            <div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6 group cursor-pointer"
              onClick={() => setActiveStat(metric.key)}
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-border bg-[length:200%_auto] rounded-2xl" style={{
                backgroundImage: `linear-gradient(90deg, ${metric.color.split(' ')[0]?.replace('from-', '') || 'blue-500'}, ${metric.color.split(' ')[1]?.replace('to-', '') || 'cyan-500'}, ${metric.color.split(' ')[0]?.replace('from-', '') || 'blue-500'})`
              }} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${metric.color} shadow-lg`}>
                    {metric.key === 'applied' && <FileText className="h-6 w-6 text-white" />}
                    {metric.key === 'interview' && <TrendingUp className="h-6 w-6 text-white" />}
                    {metric.key === 'offer' && <Award className="h-6 w-6 text-white" />}
                    {metric.key === 'rejected' && <AlertCircle className="h-6 w-6 text-white" />}
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${activeStat === metric.key
                    ? 'bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary'
                    : 'bg-white/5 text-muted-foreground'
                    }`}>
                    {metric.value}
                  </div>
                </div>

                <div className="text-lg font-bold mb-2">{metric.label}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {metric.value}
                </div>

                <div className="mt-4">
                  <Progress
                    value={(metric.value / (stats?.total || 1)) * 100}
                    className="h-1.5 bg-white/10"
                  >
                    <div className={`h-full rounded-full bg-gradient-to-r ${metric.color}`} />
                  </Progress>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
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
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
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

// Interactive Kanban View
const KanbanView = ({ applications }: { applications: Application[] }) => {
  const columns = [
    { key: 'applied', title: 'Applied', color: 'border-blue-500/30', bg: 'bg-blue-500/10' },
    { key: 'interview', title: 'Interview', color: 'border-yellow-500/30', bg: 'bg-yellow-500/10' },
    { key: 'offer', title: 'Offer', color: 'border-green-500/30', bg: 'bg-green-500/10' },
    { key: 'rejected', title: 'Rejected', color: 'border-red-500/30', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => {
        const columnApps = applications.filter(app => app.status === column.key);

        return (
          <div key={column.key} className="space-y-4">
            <div className={`flex items-center justify-between p-4 rounded-xl border ${column.color} ${column.bg}`}>
              <div className="flex items-center gap-2">
                <div className="font-bold">{column.title}</div>
                <Badge variant="outline" className="border-white/20">
                  {columnApps.length}
                </Badge>
              </div>
              <Plus className="h-4 w-4 opacity-50" />
            </div>

            <div className="space-y-3">
              {columnApps.slice(0, 4).map((app) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg border ${column.color} bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors cursor-pointer`}
                >
                  <div className="font-medium">{app.company}</div>
                  <div className="text-sm text-muted-foreground">{app.position}</div>
                </motion.div>
              ))}

              {columnApps.length > 4 && (
                <div className="text-center text-sm text-muted-foreground pt-2">
                  +{columnApps.length - 4} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
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
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        {stats && <HeroStats stats={stats} />}

        {/* Interactive Stats */}
        {stats && <StatsDashboard stats={stats} />}

        {/* Live Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <LiveMetrics />
        </motion.div>


        {/* Control Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-xl border border-white/10">
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
          </div>
        </motion.div>

        {/* Applications Section */}
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
        ) : viewMode === 'cards' ? (
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
        ) : (
          <KanbanView applications={applications} />
        )}

        {/* Floating AI Assistant */}
        <div className="fixed bottom-8 right-8 z-50">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            whileHover={{ scale: 1.1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur" />
            <Button
              size="icon"
              className="relative h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary"
            >
              <Brain className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;