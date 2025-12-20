import { useEffect, useState } from 'react';
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
  Filter,
  Trash2,
  Edit,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  TrendingUp,
  Briefcase,
  Clock,
  FileText,
  Sparkles,
  ChevronRight,
  Plus,
  MoreVertical,
  BarChart3,
  Target,
  Zap,
  Award,
  Building,
  Layers,
  Download,
  Share2,
  Star,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';
import { Card, EmptyState, Button, Input, Select, Badge, Progress, Tooltip } from '../components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Custom stat card with glass morphism and animations
const StatCard = ({
  title,
  value,
  icon: Icon,
  gradient,
  trend = 0,
  delay = 0,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  trend?: number;
  delay?: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card
        className="group relative overflow-hidden cursor-pointer bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10"
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          aria-hidden="true"
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '6s',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="h-7 w-7 text-white" aria-hidden="true" />
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-xs font-medium">
                {trend >= 0 ? (
                  <>
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span className="text-green-400">+{trend}%</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-3 w-3 text-red-400" />
                    <span className="text-red-400">{trend}%</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground/80 uppercase tracking-wider">
              {title}
            </div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {value.toLocaleString()}
              </div>
              <ChevronRight className="h-5 w-5 text-primary/60 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Enhanced Application Card
const ApplicationCard = ({
  app,
  onDelete,
  index,
}: {
  app: Application;
  onDelete: (id: string) => void;
  index: number;
}) => {
  const [showActions, setShowActions] = useState(false);
  const statusGradient = getStatusGradient(app.status);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card
        className="relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
      >
        {/* Status indicator bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${statusGradient}`}
          aria-hidden="true"
        />

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:via-primary/5 group-hover:to-primary/3 transition-all duration-500" />

        <div className="relative z-10 p-6">
          <div className="flex items-start justify-between gap-4">
            {/* Left side - Main content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-4 mb-4">
                {/* Company Avatar */}
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 group-hover:scale-105 transition-transform duration-300">
                    <Building className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="absolute -bottom-1 -right-1">
                    <Badge
                      className={`px-2 py-1 text-xs font-semibold border-0 bg-gradient-to-r ${statusGradient} text-white`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Company & Position */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {app.company}
                    </h3>
                    {app.isFavorite && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-lg font-medium text-muted-foreground truncate">
                    {app.position}
                  </p>

                  {/* Meta information */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                    {app.location && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{app.location}</span>
                      </div>
                    )}
                    {app.appliedDate && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(app.appliedDate), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                    {app.salary && (
                      <div className="flex items-center gap-2 text-green-400 font-medium">
                        <DollarSign className="h-4 w-4" />
                        <span>{app.salary}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes preview */}
              {app.notes && (
                <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {app.notes}
                  </p>
                </div>
              )}

              {/* Tags */}
              {app.tags && app.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {app.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-white/10 text-muted-foreground border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                  {app.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-muted-foreground">
                      +{app.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Right side - Actions */}
            <div className="flex flex-col items-center gap-2">
              {/* Quick action buttons */}
              <div className="flex items-center gap-1">
                <Tooltip content="View details">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary"
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
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-400"
                  >
                    <Link to={`/applications/${app._id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </Tooltip>

                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/5 hover:bg-destructive/20 hover:text-destructive"
                    onClick={() => setShowActions(!showActions)}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {showActions && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-card/95 backdrop-blur-xl border border-white/10 shadow-2xl z-50 overflow-hidden"
                      >
                        <div className="py-1">
                          <button
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-white/10 transition-colors text-left"
                            onClick={() => onDelete(app._id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span>Delete</span>
                          </button>
                          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-white/10 transition-colors text-left">
                            <Star className="h-4 w-4" />
                            <span>Add to favorites</span>
                          </button>
                          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-white/10 transition-colors text-left">
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                          </button>
                          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-white/10 transition-colors text-left">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Progress indicator for interview stages */}
              {app.status === 'interview' && (
                <div className="mt-4 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Interview Stage</div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((stage) => (
                      <div
                        key={stage}
                        className={`h-2 w-8 rounded-full ${stage <= (app.interviewStage || 1) ? 'bg-gradient-to-r from-primary to-purple-500' : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Pipeline visualization component
const PipelineView = ({ stats }: { stats: ApplicationStats }) => {
  const stages = [
    { key: 'applied', label: 'Applied', color: 'from-blue-500 to-cyan-500', icon: FileText },
    { key: 'interview', label: 'Interview', color: 'from-yellow-500 to-orange-500', icon: TrendingUp },
    { key: 'offer', label: 'Offer', color: 'from-green-500 to-emerald-500', icon: Award },
    { key: 'rejected', label: 'Rejected', color: 'from-red-500 to-pink-500', icon: AlertCircle },
  ];

  const total = Object.values(stats.byStatus).reduce((a: number, b: number) => a + b, 0);

  return (
    <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Application Pipeline
          </h3>
          <p className="text-sm text-muted-foreground">Visual overview of your job search</p>
        </div>
        <Badge variant="outline" className="border-primary/30 text-primary">
          Total: {total}
        </Badge>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const count = stats.byStatus[stage.key as keyof ApplicationStats['byStatus']] || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;

          return (
            <div key={stage.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">{stage.label}</div>
                    <div className="text-xs text-muted-foreground">{count} applications</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{count}</div>
                  <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
                </div>
              </div>
              <Progress value={percentage} className="h-2 bg-white/10">
                <div className={`h-full rounded-full bg-gradient-to-r ${stage.color}`} />
              </Progress>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// Loading skeleton with animations
const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5"
          style={{ animationDelay: `${i * 100}ms` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { applications, stats, loading, filters } = useSelector(
    (state: RootState) => state.applications
  );

  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>(
    filters.status || 'all'
  );
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

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

  const statusOptions: (ApplicationStatus | 'all')[] = [
    'all',
    'applied',
    'interview',
    'offer',
    'rejected',
    'withdrawn',
  ];

  const statCards = stats
    ? [
      {
        title: 'Total Applications',
        value: stats.total,
        icon: FileText,
        gradient: 'from-blue-500 to-cyan-500',
        trend: 12,
      },
      {
        title: 'Recent Activity',
        value: stats.recent,
        icon: Clock,
        gradient: 'from-purple-500 to-pink-500',
        trend: 8,
      },
      {
        title: 'Applied',
        value: stats.byStatus.applied,
        icon: Briefcase,
        gradient: 'from-indigo-500 to-blue-500',
        trend: 5,
      },
      {
        title: 'In Interview',
        value: stats.byStatus.interview,
        icon: TrendingUp,
        gradient: 'from-yellow-500 to-orange-500',
        trend: 15,
      },
      {
        title: 'Offers Received',
        value: stats.byStatus.offer,
        icon: Award,
        gradient: 'from-green-500 to-emerald-500',
        trend: 3,
      },
    ]
    : [];

  // Calculate success rate
  const successRate = stats && stats.total > 0
    ? ((stats.byStatus.offer + stats.byStatus.interview) / stats.total * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header with CTA */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Track, manage, and optimize your job search journey
                <span className="inline-flex items-center ml-2 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Zap className="h-3 w-3 mr-1" />
                  AI Insights Active
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {statCards.map((stat, index) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                gradient={stat.gradient}
                trend={stat.trend}
                delay={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Applications List */}
          <div className="lg:col-span-2">
            {/* Search and Filter Bar */}
            <Card className="mb-6 bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-xl border border-white/10 p-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search by company, position, or notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20"
                    aria-label="Search applications"
                  />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-48">
                    <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
                      options={statusOptions.map((status) => ({
                        value: status,
                        label: status.charAt(0).toUpperCase() + status.slice(1),
                      }))}
                      className="pl-10 bg-white/5 border-white/10"
                    />
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-3 ${viewMode === 'list' ? 'bg-primary/20 text-primary' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <Layers className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-3 ${viewMode === 'grid' ? 'bg-primary/20 text-primary' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Applications List */}
            {loading ? (
              <LoadingSkeleton />
            ) : applications.length === 0 ? (
              <EmptyState
                icon={Sparkles}
                title="No applications yet"
                description="Start tracking your job applications and take control of your career journey."
                action={
                  <Button asChild className="group">
                    <Link to="/applications/new">
                      <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
                      Create your first application
                    </Link>
                  </Button>
                }
              />
            ) : viewMode === 'list' ? (
              <div className="space-y-4">
                <AnimatePresence>
                  {applications.map((app: Application, index) => (
                    <ApplicationCard
                      key={app._id}
                      app={app}
                      onDelete={handleDelete}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applications.map((app: Application, index) => (
                  <ApplicationCard
                    key={app._id}
                    app={app}
                    onDelete={handleDelete}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Stats and Insights */}
          <div className="space-y-6">
            {/* Success Rate Card */}
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-xl border border-primary/20 p-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-3">
                  <Target className="h-4 w-4" />
                  <span className="text-sm font-medium">Success Rate</span>
                </div>
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {successRate}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Applications progressing to interview/offer stage
                </p>
              </div>
              <Progress value={parseFloat(successRate)} className="h-2 bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-purple-600" />
              </Progress>
            </Card>

            {/* Pipeline View */}
            {stats && <PipelineView stats={stats} />}

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-white/5 hover:bg-primary/10 border-white/10"
                >
                  <Link to="/applications/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-white/5 hover:bg-primary/10 border-white/10"
                >
                  <Link to="/applications/export">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start bg-white/5 hover:bg-primary/10 border-white/10"
                >
                  <Link to="/resume/feedback">
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI Resume Feedback
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {applications.slice(0, 3).map((app) => (
                  <div key={app._id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getStatusGradient(app.status)} flex items-center justify-center`}>
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{app.company}</div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(app.appliedDate || new Date()), 'MMM dd, hh:mm a')}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Floating CTA Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button
          asChild
          size="icon"
          className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary"
        >
          <Link to="/applications/new">
            <Plus className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;