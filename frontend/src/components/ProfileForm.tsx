import { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { updateProfile } from '../store/authSlice';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from './ui';
import { User as UserIcon, Mail, Phone, MapPin, Briefcase, Building, Camera, X } from 'lucide-react';
import { UpdateProfileRequest } from '../types/user';

interface ProfileFormProps {
    onSuccess?: () => void;
}

const ProfileForm = ({ onSuccess }: ProfileFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        currentRole: '',
        currentCompany: '',
        currentState: '',
        resumeFile: null as File | null,
        profilePictureFile: null as File | null,
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        currentRole: '',
        currentCompany: '',
        currentState: '',
        resumeFile: '',
    });

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        address: false,
        phone: false,
        currentRole: false,
        currentCompany: false,
        currentState: false,
        resumeFile: false,
        profilePictureFile: false,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                address: user.address || '',
                phone: user.phone || '',
                currentRole: user.currentRole || '',
                currentCompany: user.currentCompany || '',
                currentState: user.currentState || '',
                resumeFile: null,
                profilePictureFile: null,
            });
        }
    }, [user]);

    const validateField = (field: keyof typeof formData, value: string | undefined) => {
        let error = '';
        if (field === 'name' || field === 'email') {
            if (!value || !value.trim()) {
                error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            } else if (field === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = 'Please enter a valid email address';
                }
            }
        } else if (field === 'phone') {
            if (value && !/^\+?[\d\s\-\(\)]+$/.test(value)) {
                error = 'Please enter a valid phone number';
            }
        }
        // Other fields are optional, no validation
        return error;
    };

    type TextFields = Exclude<keyof typeof formData, 'resumeFile'>;

    const handleChange = (field: TextFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));

        if (touched[field]) {
            const error = validateField(field, value || undefined);
            setErrors(prev => ({ ...prev, [field]: error }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, resumeFile: file }));
        setTouched(prev => ({ ...prev, resumeFile: true }));
        // No validation for file
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, profilePictureFile: file }));
        setTouched(prev => ({ ...prev, profilePictureFile: true }));
        // No validation for profile picture file
    };

    const removeProfilePicture = () => {
        setFormData(prev => ({ ...prev, profilePictureFile: null }));
        // Reset the file input
        const fileInput = document.getElementById('profile-picture') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleBlur = (field: TextFields) => () => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const value = formData[field];
        if (typeof value === 'string' || value === undefined) {
            const error = validateField(field, value);
            setErrors(prev => ({ ...prev, [field]: error }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {
            name: validateField('name', formData.name || undefined),
            email: validateField('email', formData.email || undefined),
            address: validateField('address', formData.address || undefined),
            phone: validateField('phone', formData.phone || undefined),
            currentRole: validateField('currentRole', formData.currentRole || undefined),
            currentCompany: validateField('currentCompany', formData.currentCompany || undefined),
            currentState: validateField('currentState', formData.currentState || undefined),
            resumeFile: '',
        };

        setErrors(newErrors);
        setTouched({ name: true, email: true, address: true, phone: true, currentRole: true, currentCompany: true, currentState: true, resumeFile: true, profilePictureFile: true });

        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        // Check if data changed
        if (user && (formData.name || '') === user.name && (formData.email || '') === user.email &&
            (formData.address || '') === (user.address || '') &&
            (formData.phone || '') === (user.phone || '') &&
            (formData.currentRole || '') === (user.currentRole || '') &&
            (formData.currentCompany || '') === (user.currentCompany || '') &&
            (formData.currentState || '') === (user.currentState || '') &&
            !formData.resumeFile && !formData.profilePictureFile) {
            return; // No changes
        }

        let updateData: UpdateProfileRequest | FormData;
        if (formData.resumeFile || formData.profilePictureFile) {
            const formDataObj = new FormData();
            formDataObj.append('name', formData.name || '');
            formDataObj.append('email', formData.email || '');
            if (formData.address) formDataObj.append('address', formData.address);
            if (formData.phone) formDataObj.append('phone', formData.phone);
            if (formData.currentRole) formDataObj.append('currentRole', formData.currentRole);
            if (formData.currentCompany) formDataObj.append('currentCompany', formData.currentCompany);
            if (formData.currentState) formDataObj.append('currentState', formData.currentState);
            if (formData.resumeFile) formDataObj.append('resume', formData.resumeFile);
            if (formData.profilePictureFile) formDataObj.append('profileImage', formData.profilePictureFile);
            updateData = formDataObj;
        } else {
            updateData = {
                name: formData.name || '',
                email: formData.email || '',
                address: formData.address || undefined,
                phone: formData.phone || undefined,
                currentRole: formData.currentRole || undefined,
                currentCompany: formData.currentCompany || undefined,
                currentState: formData.currentState || undefined,
            };
        }

        const result = await dispatch(updateProfile(updateData));
        if (updateProfile.fulfilled.match(result)) {
            onSuccess?.();
        }
    };

    const hasChanges = user && (
        (formData.name || '') !== user.name ||
        (formData.email || '') !== user.email ||
        (formData.address || '') !== (user.address || '') ||
        (formData.phone || '') !== (user.phone || '') ||
        (formData.currentRole || '') !== (user.currentRole || '') ||
        (formData.currentCompany || '') !== (user.currentCompany || '') ||
        (formData.currentState || '') !== (user.currentState || '') ||
        !!formData.resumeFile ||
        !!formData.profilePictureFile
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    Profile Information
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {error && (
                        <div
                            className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive backdrop-blur-sm"
                            role="alert"
                        >
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-destructive" aria-hidden="true" />
                                {error}
                            </div>
                        </div>
                    )}

                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center space-y-4 pb-6 border-b border-border/50">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-4 border-background shadow-lg overflow-hidden">
                                {formData.profilePictureFile ? (
                                    <img
                                        src={URL.createObjectURL(formData.profilePictureFile)}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : user?.profileImage ? (
                                    <img
                                        src={`/uploads/${user.profileImage}`}
                                        alt="Current profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <UserIcon className="w-12 h-12 text-primary/60" />
                                    </div>
                                )}
                            </div>
                            <label
                                htmlFor="profile-picture"
                                className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
                                title="Change profile picture"
                            >
                                <Camera className="w-4 h-4" />
                                <input
                                    id="profile-picture"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                    className="hidden"
                                />
                            </label>
                            {formData.profilePictureFile && (
                                <button
                                    type="button"
                                    onClick={removeProfilePicture}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-lg"
                                    title="Remove profile picture"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-foreground">Profile Picture</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Click the camera icon to upload a new photo
                            </p>
                            {formData.profilePictureFile && (
                                <p className="text-xs text-primary mt-1">
                                    Selected: {formData.profilePictureFile.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Input
                            id="name"
                            type="text"
                            label="Full Name"
                            placeholder="Enter your full name"
                            required
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange('name')}
                            onBlur={handleBlur('name')}
                            leftIcon={<UserIcon className="h-5 w-5" />}
                            error={errors.name}
                        />

                        <Input
                            id="email"
                            type="email"
                            label="Email Address"
                            placeholder="you@example.com"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange('email')}
                            onBlur={handleBlur('email')}
                            leftIcon={<Mail className="h-5 w-5" />}
                            error={errors.email}
                        />

                        <Input
                            id="address"
                            type="text"
                            label="Address"
                            placeholder="Your address"
                            autoComplete="address"
                            value={formData.address}
                            onChange={handleChange('address')}
                            onBlur={handleBlur('address')}
                            leftIcon={<MapPin className="h-5 w-5" />}
                            error={errors.address}
                        />

                        <Input
                            id="phone"
                            type="tel"
                            label="Phone Number"
                            placeholder="+1 (555) 123-4567"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            leftIcon={<Phone className="h-5 w-5" />}
                            error={errors.phone}
                        />

                        <Input
                            id="currentRole"
                            type="text"
                            label="Current Role"
                            placeholder="Software Engineer"
                            autoComplete="organization-title"
                            value={formData.currentRole}
                            onChange={handleChange('currentRole')}
                            onBlur={handleBlur('currentRole')}
                            leftIcon={<Briefcase className="h-5 w-5" />}
                            error={errors.currentRole}
                        />

                        <Input
                            id="currentCompany"
                            type="text"
                            label="Current Company"
                            placeholder="Company Name"
                            autoComplete="organization"
                            value={formData.currentCompany}
                            onChange={handleChange('currentCompany')}
                            onBlur={handleBlur('currentCompany')}
                            leftIcon={<Building className="h-5 w-5" />}
                            error={errors.currentCompany}
                        />

                        <Input
                            id="currentState"
                            type="text"
                            label="Current State/Province"
                            placeholder="California"
                            value={formData.currentState}
                            onChange={handleChange('currentState')}
                            onBlur={handleBlur('currentState')}
                            leftIcon={<MapPin className="h-5 w-5" />}
                            error={errors.currentState}
                        />

                        <div className="space-y-2">
                            <label htmlFor="resume" className="text-sm font-medium text-foreground">
                                Resume/CV
                            </label>
                            <input
                                id="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                            {formData.resumeFile && (
                                <p className="text-sm text-muted-foreground">
                                    Selected: {formData.resumeFile.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={loading}
                        disabled={loading || !hasChanges}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProfileForm;