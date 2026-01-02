import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axiosInstance from '../api/axiosInstance';

interface ActiveSession {
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        address?: string;
        phone?: string;
        currentRole?: string;
        currentCompany?: string;
        currentState?: string;
        resume?: string;
        profileImage?: string;
        skills?: string;
        experience?: string;
        education?: string;
        createdAt: string;
        updatedAt: string;
    };
    loginTime: string;
    expiresAt: string;
}

interface NewUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    address?: string;
    phone?: string;
    currentRole?: string;
    currentCompany?: string;
    currentState?: string;
    resume?: string;
    profileImage?: string;
    skills?: string;
    experience?: string;
    education?: string;
    createdAt: string;
    updatedAt: string;
}

const Admin: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [data, setData] = useState<{ activeSessions: ActiveSession[]; newUsers: NewUser[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/admin/monitoring');
                setData(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        if (user?.role === 'admin') {
            fetchData();
        } else {
            setError('Access denied');
            setLoading(false);
        }
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Login Time</th>
                            <th className="border border-gray-300 p-2">Expires At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.activeSessions.map((session, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">{session.user.name}</td>
                                <td className="border border-gray-300 p-2">{session.user.email}</td>
                                <td className="border border-gray-300 p-2">{new Date(session.loginTime).toLocaleString()}</td>
                                <td className="border border-gray-300 p-2">{new Date(session.expiresAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Newly Registered Users (Last 7 days)</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Role</th>
                            <th className="border border-gray-300 p-2">Registered At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.newUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="border border-gray-300 p-2">{user.name}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2">{user.role}</td>
                                <td className="border border-gray-300 p-2">{new Date(user.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;