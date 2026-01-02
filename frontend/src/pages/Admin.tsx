import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axiosInstance from '../api/axiosInstance';
import { Card, CardContent, Button } from '../components/ui';
import { Badge } from '../components/ui';
import {
    Monitor,
    Smartphone,
    Globe,
    Shield,
    Activity,
    User,
    Clock,
    RefreshCw,
    AlertTriangle,
    Trash2,
    MoreVertical,
    Search,
    Filter,
    ChevronRight,
    Cpu,
    Network,
    HardDrive,
    Users
} from 'lucide-react';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

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

    const handleDelete = async (sessionId: string, userName: string) => {
        if (window.confirm(`Terminate session for ${userName}?`)) {
            try {
                await axiosInstance.delete(`/admin/monitoring/${sessionId}`);
                fetchData();
            } catch (err: any) {
                alert('Failed to delete session: ' + (err.response?.data?.message || 'Unknown error'));
            }
        }
    };

    const toggleCardExpand = (sessionId: string) => {
        setExpandedCard(expandedCard === sessionId ? null : sessionId);
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchData();
            const interval = setInterval(fetchData, 30000); // Auto-refresh every 30s
            return () => clearInterval(interval);
        } else {
            setError('Access denied');
            setLoading(false);
        }
    }, [user]);

    const getDeviceIcon = (deviceType: string) => {
        switch (deviceType) {
            case 'mobile': return <Smartphone className="h-4 w-4" />;
            case 'tablet': return <HardDrive className="h-4 w-4" />;
            default: return <Monitor className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500';
            case 'inactive': return 'bg-gray-500';
            case 'suspended': return 'bg-red-500';
            default: return 'bg-blue-500';
        }
    };

    const filteredUsers = data[0]?.activeUsers?.filter(activeUser => {
        if (selectedFilter === 'suspicious' && !activeUser.security.isSuspicious) return false;
        if (selectedFilter === 'mobile' && activeUser.session.deviceType !== 'mobile') return false;
        if (selectedFilter === 'admin' && activeUser.user.role !== 'admin') return false;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                activeUser.user.name.toLowerCase().includes(query) ||
                activeUser.user.email.toLowerCase().includes(query) ||
                (activeUser.session.IP || '').includes(query) ||
                (activeUser.session.geo?.city || '').toLowerCase().includes(query)
            );
        }
        return true;
    }) || [];

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">Loading monitoring data...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
                <h2 className="text-xl font-semibold text-red-600">Error</h2>
                <p className="text-muted-foreground">{error}</p>
                <Button onClick={fetchData}>Retry</Button>
            </div>
        </div>
    );

    if (!data.length) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
                <Users className="h-12 w-12 text-muted-foreground mx-auto" />
                <h2 className="text-xl font-semibold">No Data Available</h2>
                <p className="text-muted-foreground">Start monitoring user sessions</p>
                <Button onClick={fetchData}>Load Data</Button>
            </div>
        </div>
    );

    const monitoring = data[0];

    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-background to-secondary/5 min-h-screen">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Session Monitoring
                    </h1>
                    <p className="text-muted-foreground mt-2">Real-time overview of active user sessions</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-card px-3 py-2 rounded-lg border">
                            <Users className="h-4 w-4" />
                            <span className="font-semibold">{monitoring.activeUsersCount}</span>
                            <span className="text-sm text-muted-foreground">active</span>
                        </div>
                        <div className="flex items-center gap-2 bg-card px-3 py-2 rounded-lg border">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm text-muted-foreground">Window:</span>
                            <span className="font-semibold">{monitoring.activeWindowMinutes}m</span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={fetchData}
                        disabled={loading}
                        className="gap-2"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? 'Syncing...' : 'Refresh'}
                    </Button>
                </div>
            </div>

            {/* Stats & Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-card to-primary/5">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Sessions</p>
                                <p className="text-2xl font-bold">{monitoring.activeUsersCount}</p>
                            </div>
                            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-card to-secondary/5">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Suspicious</p>
                                <p className="text-2xl font-bold">
                                    {monitoring.activeUsers.filter(u => u.security.isSuspicious).length}
                                </p>
                            </div>
                            <div className="h-10 w-10 bg-red-500/10 rounded-full flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-card to-green-500/5">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Avg Requests</p>
                                <p className="text-2xl font-bold">
                                    {Math.round(monitoring.activeUsers.reduce((acc, u) => acc + u.activity.averageRequestsPerMinute, 0) / monitoring.activeUsersCount)}
                                </p>
                            </div>
                            <div className="h-10 w-10 bg-green-500/10 rounded-full flex items-center justify-center">
                                <Activity className="h-5 w-5 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-card to-blue-500/5">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Mobile Devices</p>
                                <p className="text-2xl font-bold">
                                    {monitoring.activeUsers.filter(u => u.session.deviceType === 'mobile').length}
                                </p>
                            </div>
                            <div className="h-10 w-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                                <Smartphone className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters & Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:flex-initial">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search users, emails, IPs..."
                                    className="pl-10 pr-4 py-2 border rounded-lg w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" className="flex-shrink-0">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                            {['all', 'suspicious', 'mobile', 'admin'].map((filter) => (
                                <Button
                                    key={filter}
                                    variant={selectedFilter === filter ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedFilter(filter)}
                                    className="whitespace-nowrap"
                                >
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* User Sessions List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Active Sessions ({filteredUsers.length})</h2>
                    <span className="text-sm text-muted-foreground">
                        Updated: {new Date(monitoring.generatedAt).toLocaleTimeString()}
                    </span>
                </div>

                {filteredUsers.map((activeUser) => (
                    <Card
                        key={activeUser.session.sessionId}
                        className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${expandedCard === activeUser.session.sessionId ? 'ring-2 ring-primary' : ''
                            } ${activeUser.security.isSuspicious ? 'border-red-200' : ''}`}
                    >
                        <CardContent className="p-0">
                            {/* Session Header */}
                            <div className="p-4 border-b">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(activeUser.user.accountStatus)}`} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold">{activeUser.user.name}</h3>
                                                <Badge variant={activeUser.user.role === 'admin' ? 'destructive' : 'outline'}>
                                                    {activeUser.user.role}
                                                </Badge>
                                                {activeUser.security.isSuspicious && (
                                                    <Badge variant="destructive" className="gap-1">
                                                        <AlertTriangle className="h-3 w-3" />
                                                        Suspicious
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{activeUser.user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleCardExpand(activeUser.session.sessionId)}
                                            className="gap-1"
                                        >
                                            {expandedCard === activeUser.session.sessionId ? 'Collapse' : 'Expand'}
                                            <ChevronRight className={`h-4 w-4 transition-transform ${expandedCard === activeUser.session.sessionId ? 'rotate-90' : ''
                                                }`} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(activeUser.session.sessionId, activeUser.user.name)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="p-4 border-b">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                            {getDeviceIcon(activeUser.session.deviceType)}
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Device</p>
                                            <p className="font-medium capitalize">{activeUser.session.deviceType}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                            <Globe className="h-4 w-4 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Location</p>
                                            <p className="font-medium">{activeUser.session.geo?.city || 'Unknown'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                            <Cpu className="h-4 w-4 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Requests</p>
                                            <p className="font-medium">{activeUser.activity.requestCount}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                            <Clock className="h-4 w-4 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Duration</p>
                                            <p className="font-medium">
                                                {Math.floor((new Date().getTime() - new Date(activeUser.session.loginAt).getTime()) / (1000 * 60 * 60))}h
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedCard === activeUser.session.sessionId && (
                                <div className="p-4 bg-muted/30">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {/* User Details */}
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                User Profile
                                            </h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Account Status</p>
                                                    <Badge variant={activeUser.user.accountStatus === 'active' ? 'default' : 'secondary'}>
                                                        {activeUser.user.accountStatus}
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Created</p>
                                                    <p className="text-sm">{new Date(activeUser.user.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Last Login</p>
                                                    <p className="text-sm">{activeUser.user.lastLoginAt ? new Date(activeUser.user.lastLoginAt).toLocaleString() : 'Never'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Session Details */}
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                                                <Network className="h-4 w-4" />
                                                Session Details
                                            </h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">IP Address</p>
                                                    <code className="text-sm bg-background px-2 py-1 rounded">{activeUser.session.IP}</code>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">User Agent</p>
                                                    <p className="text-sm truncate">{activeUser.session.userAgent}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Expires</p>
                                                    <p className="text-sm">{new Date(activeUser.session.expiresAt).toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Activity Details */}
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                                                <Activity className="h-4 w-4" />
                                                Activity
                                            </h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Last Endpoint</p>
                                                    <code className="text-sm bg-background px-2 py-1 rounded block truncate">
                                                        {activeUser.activity.lastEndpoint || 'N/A'}
                                                    </code>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Requests/Min</p>
                                                    <p className="text-sm">{activeUser.activity.averageRequestsPerMinute.toFixed(1)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Pages Visited</p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {activeUser.activity.pagesVisited.slice(0, 3).map((page, i) => (
                                                            <Badge key={i} variant="outline" className="text-xs">
                                                                {page}
                                                            </Badge>
                                                        ))}
                                                        {activeUser.activity.pagesVisited.length > 3 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{activeUser.activity.pagesVisited.length - 3} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Security Details */}
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                                                <Shield className="h-4 w-4" />
                                                Security
                                            </h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Token Expires</p>
                                                    <p className="text-sm">{new Date(activeUser.security.tokenExpiresAt).toLocaleTimeString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Security Flags</p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {activeUser.security.flags.length > 0 ? (
                                                            activeUser.security.flags.map((flag, i) => (
                                                                <Badge key={i} variant="destructive" className="text-xs">
                                                                    {flag}
                                                                </Badge>
                                                            ))
                                                        ) : (
                                                            <Badge variant="outline" className="text-xs">
                                                                None
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}

                {filteredUsers.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No sessions found</h3>
                            <p className="text-muted-foreground mb-4">
                                {searchQuery ? 'Try a different search term' : 'No active sessions match your filters'}
                            </p>
                            {(searchQuery || selectedFilter !== 'all') && (
                                <Button variant="outline" onClick={() => {
                                    setSearchQuery('');
                                    setSelectedFilter('all');
                                }}>
                                    Clear filters
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Admin;