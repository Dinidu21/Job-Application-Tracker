import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axiosInstance from '../api/axiosInstance';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../components/ui';
import { Badge } from '../components/ui';
import { Monitor, Smartphone, Globe, Shield, Activity, User, Clock, MapPin } from 'lucide-react';

interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: string;
    accountStatus: string;
    createdAt: string;
    lastLoginAt: string;
    lastSeenAt: string;
}

interface GeoInfo {
    country: string;
    city: string;
}

interface SessionInfo {
    sessionId: string;
    loginAt: string;
    lastSeenAt: string;
    expiresAt: string;
    deviceType: string;
    userAgent: string;
    IP: string;
    geo: GeoInfo;
}

interface ActivityInfo {
    lastEndpoint: string | null;
    requestCount: number;
    averageRequestsPerMinute: number;
    pagesVisited: string[];
}

interface SecurityInfo {
    tokenExpiresAt: string;
    isSuspicious: boolean;
    flags: string[];
}

interface ActiveUser {
    user: UserInfo;
    session: SessionInfo;
    activity: ActivityInfo;
    security: SecurityInfo;
}

interface MonitoringData {
    activeWindowMinutes: number;
    generatedAt: string;
    activeUsersCount: number;
    activeUsers: ActiveUser[];
}

const Admin: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [data, setData] = useState<MonitoringData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axiosInstance.get('/admin/monitoring');
            setData(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (sessionId: string) => {
        if (confirm('Are you sure you want to delete this session?')) {
            try {
                await axiosInstance.delete(`/admin/monitoring/${sessionId}`);
                fetchData(); // Refresh data after deletion
            } catch (err: any) {
                alert('Failed to delete session: ' + (err.response?.data?.message || 'Unknown error'));
            }
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchData();
        } else {
            setError('Access denied');
            setLoading(false);
        }
    }, [user]);

    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
    if (data.length === 0) return <div className="flex items-center justify-center min-h-screen">No data available</div>;

    const monitoring = data[0];

    return (
        <div className="p-6 space-y-6 bg-background min-h-screen">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard - All Users & Sessions</h1>
                <div className="flex items-center gap-4">
                    <Badge variant="secondary">Users/Sessions: {monitoring.activeUsersCount}</Badge>
                    <Badge variant="outline">Window: {monitoring.activeWindowMinutes} min</Badge>
                    <span className="text-sm text-muted-foreground">Generated: {new Date(monitoring.generatedAt).toLocaleString()}</span>
                    <Button variant="outline" onClick={fetchData} disabled={loading}>
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {monitoring.activeUsers.map((activeUser: ActiveUser, index: number) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    {activeUser.user.name}
                                    <Badge variant={activeUser.user.role === 'admin' ? 'destructive' : 'default'}>
                                        {activeUser.user.role}
                                    </Badge>
                                </CardTitle>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(activeUser.session.sessionId)}>
                                    Delete Session
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">User</h4>
                                    </div>
                                    <p className="text-sm"><strong>Name:</strong> {activeUser.user.name}</p>
                                    <p className="text-sm"><strong>Email:</strong> {activeUser.user.email}</p>
                                    <p className="text-sm"><strong>Status:</strong> <Badge variant={activeUser.user.accountStatus === 'active' ? 'default' : 'secondary'}>{activeUser.user.accountStatus}</Badge></p>
                                    <p className="text-sm"><strong>Created:</strong> {new Date(activeUser.user.createdAt).toLocaleString()}</p>
                                    <p className="text-sm"><strong>Last Login:</strong> {activeUser.user.lastLoginAt ? new Date(activeUser.user.lastLoginAt).toLocaleString() : 'Never'}</p>
                                    <p className="text-sm"><strong>Last Seen:</strong> {activeUser.user.lastSeenAt ? new Date(activeUser.user.lastSeenAt).toLocaleString() : 'Never'}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Session</h4>
                                    </div>
                                    <p className="text-sm"><strong>Device:</strong> <span className="flex items-center gap-1">{activeUser.session.deviceType === 'mobile' ? <Smartphone className="h-3 w-3" /> : <Monitor className="h-3 w-3" />} {activeUser.session.deviceType}</span></p>
                                    <p className="text-sm"><strong>IP:</strong> {activeUser.session.IP}</p>
                                    <p className="text-sm"><strong>Location:</strong> <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {activeUser.session.geo.city}, {activeUser.session.geo.country}</span></p>
                                    <p className="text-sm"><strong>Login At:</strong> {new Date(activeUser.session.loginAt).toLocaleString()}</p>
                                    <p className="text-sm"><strong>Expires:</strong> {new Date(activeUser.session.expiresAt).toLocaleString()}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Activity className="h-4 w-4" />
                                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Activity</h4>
                                    </div>
                                    <p className="text-sm"><strong>Last Endpoint:</strong> {activeUser.activity.lastEndpoint || 'N/A'}</p>
                                    <p className="text-sm"><strong>Request Count:</strong> {activeUser.activity.requestCount}</p>
                                    <p className="text-sm"><strong>Avg Req/Min:</strong> {activeUser.activity.averageRequestsPerMinute}</p>
                                    <p className="text-sm"><strong>Pages Visited:</strong> {activeUser.activity.pagesVisited.length > 0 ? activeUser.activity.pagesVisited.join(', ') : 'None'}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4" />
                                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Security</h4>
                                    </div>
                                    <p className="text-sm"><strong>Token Expires:</strong> {new Date(activeUser.security.tokenExpiresAt).toLocaleString()}</p>
                                    <p className="text-sm"><strong>Suspicious:</strong> <Badge variant={activeUser.security.isSuspicious ? 'destructive' : 'secondary'}>{activeUser.security.isSuspicious ? 'Yes' : 'No'}</Badge></p>
                                    <p className="text-sm"><strong>Flags:</strong> {activeUser.security.flags.length > 0 ? activeUser.security.flags.join(', ') : 'None'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {monitoring.activeUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    No users or sessions found !!
                </div>
            )}
        </div>
    );
};

export default Admin;

