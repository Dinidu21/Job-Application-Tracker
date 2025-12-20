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
import { getStatusColor } from '../utils/statusColors';
import { Application, ApplicationStatus } from '../types/application';
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
  CheckCircle2,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Card, EmptyState, Button, Input, Select } from '../components/ui';

const StatCard = ({
  title,
  value,
  icon: Icon,
  gradient,
  delay = 0,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  delay?: number;
}) => {
  return (
    <Card
      variant="glass"
      className="group relative overflow-hidden cursor-glow hover-glow magnetic-hover animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
          >
            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
        </div>
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="mt-2 text-3xl font-bold text-foreground">{value}</div>
      </div>
    </Card>
  );
};

const ApplicationCard = ({
  app,
  onDelete,
}: {
  app: Application;
  onDelete: (id: string) => void;
}) => {
  return (
    <Card
      variant="glass"
      className="group relative overflow-hidden cursor-glow hover-glow magnetic-hover animate-slide-up"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-all duration-300 group-hover:from-primary/5 group-hover:to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {app.company}
                  </h3>
                  <p className="mt-1 truncate text-base font-medium text-muted-foreground">
                    {app.position}
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-4 text-sm">
            {app.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{app.location}</span>
              </div>
            )}
            {app.appliedDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>{format(new Date(app.appliedDate), 'MMM dd, yyyy')}</span>
              </div>
            )}
            {app.salary && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" aria-hidden="true" />
                <span>{app.salary}</span>
              </div>
            )}
          </div>

          {app.notes && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{app.notes}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label={`View ${app.company} application details`}
          >
            <Link to={`/applications/${app._id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label={`Edit ${app.company} application`}
          >
            <Link to={`/applications/${app._id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(app._id)}
            aria-label={`Delete ${app.company} application`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-2xl bg-muted/50"
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
      },
      {
        title: 'Recent',
        value: stats.recent,
        icon: Clock,
        gradient: 'from-purple-500 to-pink-500',
      },
      {
        title: 'Applied',
        value: stats.byStatus.applied,
        icon: Briefcase,
        gradient: 'from-indigo-500 to-blue-500',
      },
      {
        title: 'Interview',
        value: stats.byStatus.interview,
        icon: TrendingUp,
        gradient: 'from-yellow-500 to-orange-500',
      },
      {
        title: 'Offers',
        value: stats.byStatus.offer,
        icon: CheckCircle2,
        gradient: 'from-green-500 to-emerald-500',
      },
    ]
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {statCards.map((stat, index) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                gradient={stat.gradient}
                delay={index * 100}
              />
            ))}
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by company, position, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                aria-label="Search applications"
              />
            </div>
            <div className="relative md:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
                  options={statusOptions.map((status) => ({
                    value: status,
                    label: status.charAt(0).toUpperCase() + status.slice(1),
                  }))}
                  className="pl-10"
                  aria-label="Filter by status"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <LoadingSkeleton />
        ) : applications.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No applications yet"
            description="Start tracking your job applications and take control of your career journey."
            action={
              <Button asChild>
                <Link to="/applications/new">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Create your first application
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4">
            {applications.map((app: Application, index) => (
              <div key={app._id} style={{ animationDelay: `${index * 50}ms` }}>
                <ApplicationCard app={app} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
