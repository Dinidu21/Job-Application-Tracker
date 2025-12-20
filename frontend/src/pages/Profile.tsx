import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileForm from '../components/ProfileForm';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

/**
 * Profile Page Component
 *
 * Dedicated page for user profile management with photo upload functionality.
 * Provides a clean, focused interface for updating user information and profile picture.
 */
const Profile: React.FC = () => {
    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBackToDashboard}
                        className="h-10 w-10"
                        aria-label="Back to dashboard"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
                        <p className="mt-2 text-muted-foreground">
                            Manage your personal information and profile picture
                        </p>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="mx-auto max-w-2xl">
                    <ProfileForm onSuccess={handleBackToDashboard} />
                </div>
            </main>
        </div>
    );
};

export default Profile;