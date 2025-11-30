import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { fetchApplication, deleteApplication } from '../store/applicationSlice';
import Navbar from '../components/Navbar';
import { getStatusColor } from '../utils/statusColors';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  Link as LinkIcon,
  Mail,
  User,
  Briefcase,
  FileText,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardContent, EmptyState } from '../components/ui';

const ApplicationDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { applications, loading } = useSelector((state: RootState) => state.applications);

  const application = id
    ? applications.find((app) => app._id === id) || null
    : null;

  useEffect(() => {
    if (id) {
      if (!application) {
        dispatch(fetchApplication(id));
      }
    }
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (id && window.confirm('Are you sure you want to delete this application?')) {
      await dispatch(deleteApplication(id));
      navigate('/dashboard');
    }
  };

  if (loading && !application) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground">Loading application...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <EmptyState
            icon={FileText}
            title="Application not found"
            description="The application you're looking for doesn't exist or has been deleted."
            action={
              <Button asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            }
          />
        </main>
      </div>
    );
  }

  const detailItems = [
    {
      icon: Calendar,
      label: 'Applied Date',
      value: application.appliedDate
        ? format(new Date(application.appliedDate), 'MMMM dd, yyyy')
        : null,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: application.location,
    },
    {
      icon: DollarSign,
      label: 'Salary',
      value: application.salary,
    },
    {
      icon: LinkIcon,
      label: 'Job URL',
      value: application.jobUrl,
      isLink: true,
    },
    {
      icon: User,
      label: 'Contact Name',
      value: application.contactName,
    },
    {
      icon: Mail,
      label: 'Contact Email',
      value: application.contactEmail,
      isEmail: true,
    },
  ].filter((item) => item.value);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 animate-fade-in">
          <Button asChild variant="ghost" size="sm">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="mx-auto max-w-4xl animate-slide-up">
          <Card variant="glass">
            {/* Header */}
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                      <Briefcase className="h-8 w-8 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="mb-2 text-3xl">{application.company}</CardTitle>
                      <p className="text-xl font-medium text-muted-foreground">
                        {application.position}
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <span
                      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild variant="default">
                    <Link to={`/applications/${application._id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Details Grid */}
              {detailItems.length > 0 && (
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {detailItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Card
                        key={item.label}
                        variant="outlined"
                        className="group flex items-center gap-4 p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                          <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-1 text-xs font-medium text-muted-foreground">
                            {item.label}
                          </div>
                          {item.isLink ? (
                            <a
                              href={item.value as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                            >
                              <span className="truncate">View Job Posting</span>
                              <ExternalLink className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                            </a>
                          ) : item.isEmail ? (
                            <a
                              href={`mailto:${item.value}`}
                              className="text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                            >
                              {item.value as string}
                            </a>
                          ) : (
                            <div className="text-sm font-medium text-foreground">
                              {item.value as string}
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Notes */}
              {application.notes && (
                <div className="mb-8 animate-fade-in">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h2 className="text-lg font-semibold text-foreground">Notes</h2>
                  </div>
                  <Card variant="outlined" className="p-6">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {application.notes}
                    </p>
                  </Card>
                </div>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>
                    Created: {format(new Date(application.createdAt), 'MMMM dd, yyyy HH:mm')}
                  </span>
                </div>
                {application.updatedAt !== application.createdAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>
                      Updated: {format(new Date(application.updatedAt), 'MMMM dd, yyyy HH:mm')}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ApplicationDetails;
