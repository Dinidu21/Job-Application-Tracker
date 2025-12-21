import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    Target,
    Clock,
    Award,
    BarChart3,
    PieChart,
    Activity,
    Building,
} from 'lucide-react';
import { cn } from '../../utils/cn';

// Mock data for enhanced analytics
const mockAnalyticsData = {
    weeklyApplications: [
        { week: 'Week 1', applied: 12, interviews: 3, offers: 1 },
        { week: 'Week 2', applied: 15, interviews: 5, offers: 2 },
        { week: 'Week 3', applied: 18, interviews: 7, offers: 3 },
        { week: 'Week 4', applied: 22, interviews: 8, offers: 4 },
    ],
    responseTimes: [
        { company: 'Tech Corp', days: 3, status: 'interview' },
        { company: 'StartupXYZ', days: 7, status: 'rejected' },
        { company: 'BigTech Inc', days: 14, status: 'interview' },
        { company: 'Dev Agency', days: 2, status: 'offer' },
    ],
    industryBreakdown: [
        { industry: 'Technology', count: 45, percentage: 60 },
        { industry: 'Finance', count: 15, percentage: 20 },
        { industry: 'Healthcare', count: 10, percentage: 13 },
        { industry: 'Others', count: 5, percentage: 7 },
    ],
    successMetrics: {
        averageResponseTime: 5.2,
        successRate: 23.5,
        applicationsPerWeek: 16.8,
        interviewToOfferRatio: 0.5,
    },
};

interface KPICardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon: React.ElementType;
    description?: string;
    className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
    title,
    value,
    change,
    changeType = 'neutral',
    icon: Icon,
    description,
    className,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                'relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6 group hover:border-primary/30 transition-all duration-300',
                className
            )}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30">
                            <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm text-muted-foreground">{title}</h3>
                            {description && (
                                <p className="text-xs text-muted-foreground mt-1">{description}</p>
                            )}
                        </div>
                    </div>

                    {change && (
                        <div className={cn(
                            'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                            changeType === 'positive' && 'bg-green-500/20 text-green-400',
                            changeType === 'negative' && 'bg-red-500/20 text-red-400',
                            changeType === 'neutral' && 'bg-gray-500/20 text-gray-400'
                        )}>
                            {changeType === 'positive' && <TrendingUp className="h-3 w-3" />}
                            {changeType === 'negative' && <TrendingDown className="h-3 w-3" />}
                            <span>{change}</span>
                        </div>
                    )}
                </div>

                <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {value}
                </div>
            </div>
        </motion.div>
    );
};

const SimpleBarChart: React.FC<{ data: any[] }> = ({ data }) => {
    const maxValue = Math.max(...data.flatMap(d => [d.applied, d.interviews, d.offers]));

    return (
        <div className="space-y-4">
            {data.map((item, index) => (
                <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.week}</span>
                        <span className="text-muted-foreground">{item.applied} applied</span>
                    </div>
                    <div className="flex gap-1 h-6">
                        <div
                            className="bg-blue-500 rounded-sm transition-all duration-500"
                            style={{ width: `${(item.applied / maxValue) * 100}%` }}
                        />
                        <div
                            className="bg-yellow-500 rounded-sm transition-all duration-500"
                            style={{ width: `${(item.interviews / maxValue) * 100}%` }}
                        />
                        <div
                            className="bg-green-500 rounded-sm transition-all duration-500"
                            style={{ width: `${(item.offers / maxValue) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

const SimplePieChart: React.FC<{ data: any[] }> = ({ data }) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];

    return (
        <div className="space-y-4">
            {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={cn('w-3 h-3 rounded-full', colors[index % colors.length])} />
                        <span className="text-sm font-medium">{item.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{item.count}</span>
                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className={cn('h-full transition-all duration-1000', colors[index % colors.length])}
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const AnalyticsDashboard: React.FC = () => {
    const { stats } = useSelector((state: RootState) => state.applications);
    const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

    const kpiData = [
        {
            title: 'Total Applications',
            value: stats?.total || 0,
            change: '+12%',
            changeType: 'positive' as const,
            icon: Target,
            description: 'This month',
        },
        {
            title: 'Success Rate',
            value: `${mockAnalyticsData.successMetrics.successRate}%`,
            change: '+2.3%',
            changeType: 'positive' as const,
            icon: Award,
            description: 'Interview to offer conversion',
        },
        {
            title: 'Avg Response Time',
            value: `${mockAnalyticsData.successMetrics.averageResponseTime}d`,
            change: '-1.2d',
            changeType: 'positive' as const,
            icon: Clock,
            description: 'Days to first response',
        },
        {
            title: 'Active Applications',
            value: stats?.byStatus.applied || 0,
            change: '+5',
            changeType: 'positive' as const,
            icon: Activity,
            description: 'Currently in progress',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent">
                        Analytics Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Track your job search performance and optimize your strategy
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {(['week', 'month', 'quarter'] as const).map((timeframe) => (
                        <button
                            key={timeframe}
                            onClick={() => setSelectedTimeframe(timeframe)}
                            className={cn(
                                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                selectedTimeframe === timeframe
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-white/5 hover:bg-white/10'
                            )}
                        >
                            {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => (
                    <KPICard key={index} {...kpi} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weekly Progress Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                                <BarChart3 className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Weekly Progress</h3>
                                <p className="text-sm text-muted-foreground">Applications, interviews, and offers</p>
                            </div>
                        </div>

                        <SimpleBarChart data={mockAnalyticsData.weeklyApplications} />

                        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                <span className="text-xs text-muted-foreground">Applied</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                <span className="text-xs text-muted-foreground">Interviews</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                                <span className="text-xs text-muted-foreground">Offers</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Industry Breakdown */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                                <PieChart className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Industry Focus</h3>
                                <p className="text-sm text-muted-foreground">Where you're applying</p>
                            </div>
                        </div>

                        <SimplePieChart data={mockAnalyticsData.industryBreakdown} />
                    </div>
                </motion.div>
            </div>

            {/* Response Times Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 p-6"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                            <Clock className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Response Times</h3>
                            <p className="text-sm text-muted-foreground">How quickly companies respond</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {mockAnalyticsData.responseTimes.map((response, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                                        <Building className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{response.company}</div>
                                        <div className="text-sm text-muted-foreground capitalize">{response.status}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <div className="font-bold">{response.days} days</div>
                                        <div className="text-xs text-muted-foreground">response time</div>
                                    </div>
                                    <div className={cn(
                                        'px-3 py-1 rounded-full text-xs font-medium',
                                        response.days <= 3 && 'bg-green-500/20 text-green-400',
                                        response.days <= 7 && response.days > 3 && 'bg-yellow-500/20 text-yellow-400',
                                        response.days > 7 && 'bg-red-500/20 text-red-400'
                                    )}>
                                        {response.days <= 3 ? 'Fast' : response.days <= 7 ? 'Normal' : 'Slow'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AnalyticsDashboard;