import { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import {
  createApplication,
  updateApplication,
  fetchApplication,
} from '../store/applicationSlice';
import Navbar from '../components/Navbar';
import { ApplicationStatus, CreateApplicationDTO } from '../types/application';
import {
  ArrowLeft,
  Building2,
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  Link as LinkIcon,
  Mail,
  User,
  FileText,
  Save,
} from 'lucide-react';
import { Button, Input, Textarea, Select, Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui';

const ApplicationForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading } = useSelector((state: RootState) => state.applications);

  const isEdit = !!id;

  const [formData, setFormData] = useState<CreateApplicationDTO>({
    company: '',
    position: '',
    status: 'applied',
    appliedDate: new Date().toISOString().split('T')[0],
    notes: '',
    location: '',
    salary: '',
    jobUrl: '',
    contactEmail: '',
    contactName: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchApplication(id)).then((result) => {
        if (fetchApplication.fulfilled.match(result)) {
          const app = result.payload;
          setFormData({
            company: app.company,
            position: app.position,
            status: app.status,
            appliedDate: app.appliedDate
              ? new Date(app.appliedDate).toISOString().split('T')[0]
              : '',
            notes: app.notes || '',
            location: app.location || '',
            salary: app.salary || '',
            jobUrl: app.jobUrl || '',
            contactEmail: app.contactEmail || '',
            contactName: app.contactName || '',
          });
        }
      });
    }
  }, [id, isEdit, dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isEdit && id) {
      const result = await dispatch(updateApplication({ id, data: formData }));
      if (updateApplication.fulfilled.match(result)) {
        navigate(`/applications/${id}`);
      }
    } else {
      const result = await dispatch(createApplication(formData));
      if (createApplication.fulfilled.match(result)) {
        navigate('/dashboard');
      }
    }
  };

  const statusOptions: ApplicationStatus[] = [
    'applied',
    'interview',
    'offer',
    'rejected',
    'withdrawn',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 animate-fade-in">
          <Button asChild variant="ghost" size="sm">
            <Link to={isEdit ? `/applications/${id}` : '/dashboard'}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="mx-auto max-w-3xl animate-slide-up">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-3xl">
                {isEdit ? 'Edit Application' : 'New Application'}
              </CardTitle>
              <CardDescription>
                {isEdit
                  ? 'Update your application details'
                  : 'Add a new job application to track'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    id="company"
                    label="Company"
                    placeholder="Company name"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    leftIcon={<Building2 className="h-5 w-5" />}
                  />

                  <Input
                    id="position"
                    label="Position"
                    placeholder="Job title"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    leftIcon={<Briefcase className="h-5 w-5" />}
                  />

                  <Select
                    id="status"
                    label="Status"
                    required
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as ApplicationStatus })
                    }
                    options={statusOptions.map((status) => ({
                      value: status,
                      label: status.charAt(0).toUpperCase() + status.slice(1),
                    }))}
                  />

                  <Input
                    id="appliedDate"
                    type="date"
                    label="Applied Date"
                    required
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                    leftIcon={<Calendar className="h-5 w-5" />}
                  />

                  <Input
                    id="location"
                    label="Location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    leftIcon={<MapPin className="h-5 w-5" />}
                  />

                  <Input
                    id="salary"
                    label="Salary"
                    placeholder="$100,000"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    leftIcon={<DollarSign className="h-5 w-5" />}
                  />

                  <Input
                    id="jobUrl"
                    type="url"
                    label="Job URL"
                    placeholder="https://..."
                    value={formData.jobUrl}
                    onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                    leftIcon={<LinkIcon className="h-5 w-5" />}
                  />

                  <Input
                    id="contactName"
                    label="Contact Name"
                    placeholder="John Doe"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    leftIcon={<User className="h-5 w-5" />}
                  />

                  <Input
                    id="contactEmail"
                    type="email"
                    label="Contact Email"
                    placeholder="contact@company.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    leftIcon={<Mail className="h-5 w-5" />}
                  />
                </div>

                <Textarea
                  id="notes"
                  label="Notes"
                  rows={6}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes about this application..."
                />

                <div className="flex gap-4 pt-4">
                  <Button type="submit" fullWidth isLoading={loading} disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isEdit ? 'Update Application' : 'Create Application'}
                  </Button>
                  <Button asChild variant="outline">
                    <Link to={isEdit ? `/applications/${id}` : '/dashboard'}>Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ApplicationForm;
