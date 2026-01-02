import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axiosInstance from '../api/axiosInstance';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../components/ui';
import { Badge } from '../components/ui';

interface UserInfo {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    lastLoginAt: string;
    lastSeenAt: string;
}

interface SessionInfo {
    sessionId: string;
    loginAt: string;
    lastSeenAt: string;
    expiresAt: string;
}

interface NetworkInfo {
    ip: string;
}

interface DeviceInfo {
    userAgent: string;
}

interface ActivityInfo {
    lastEndpoint: string | null;
    requestCount: number;
}

interface SecurityInfo {
    tokenExpiresAt: string;
    isSuspicious: boolean;
}

interface ActiveUser {
    user: UserInfo;
    session: SessionInfo;
    network: NetworkInfo;
    device: DeviceInfo;
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
                            <CardTitle className="flex items-center gap-2">
                                {activeUser.user.name}
                                <Badge variant={activeUser.user.role === 'admin' ? 'destructive' : 'default'}>
                                    {activeUser.user.role}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">User</h4>
                                    <p className="text-sm"><strong>Email:</strong> {activeUser.user.email}</p>
                                    <p className="text-sm"><strong>Created:</strong> {new Date(activeUser.user.createdAt).toLocaleString()}</p>
                                    <p className="text-sm"><strong>Last Login:</strong> {new Date(activeUser.user.lastLoginAt).toLocaleString()}</p>
                                    <p className="text-sm"><strong>Last Seen:</strong> {new Date(activeUser.user.lastSeenAt).toLocaleString()}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Session</h4>
                                    <p className="text-sm"><strong>Session ID:</strong> {activeUser.session.sessionId}</p>
                                    <p className="text-sm"><strong>Login At:</strong> {new Date(activeUser.session.loginAt).toLocaleString()}</p>
                                    <p className="text-sm"><strong>Last Seen:</strong> {new Date(activeUser.session.lastSeenAt).toLocaleString()}</p>
                                    <p className="text-sm"><strong>Expires:</strong> {new Date(activeUser.session.expiresAt).toLocaleString()}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Network</h4>
                                    <p className="text-sm"><strong>IP:</strong> {activeUser.network.ip}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Device</h4>
                                    <p className="text-sm text-xs break-all"><strong>User Agent:</strong> {activeUser.device.userAgent}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Activity</h4>
                                    <p className="text-sm"><strong>Last Endpoint:</strong> {activeUser.activity.lastEndpoint || 'N/A'}</p>
                                    <p className="text-sm"><strong>Request Count:</strong> {activeUser.activity.requestCount}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Security</h4>
                                    <p className="text-sm"><strong>Token Expires:</strong> {new Date(activeUser.security.tokenExpiresAt).toLocaleString()}</p>
                                    <p className="text-sm"><strong>Suspicious:</strong> <Badge variant={activeUser.security.isSuspicious ? 'destructive' : 'secondary'}>{activeUser.security.isSuspicious ? 'Yes' : 'No'}</Badge></p>
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