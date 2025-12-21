import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';

const Analytics: React.FC = () => {
    return (
        <DashboardLayout>
            <AnalyticsDashboard />
        </DashboardLayout>
    );
};

export default Analytics;