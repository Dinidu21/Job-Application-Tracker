import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Session from '../models/Session';
import User from '../models/User';

export const getMonitoringData = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Fetch ALL sessions (remove expiresAt filter to include inactive/historical ones)
        const allSessions = await Session.find({}).populate('userId').lean();

        const usersData = allSessions.map(s => {
            const user = s.userId as any;
            return {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    createdAt: user.createdAt,
                    lastLoginAt: user.lastLoginAt,
                    lastSeenAt: user.lastSeenAt,
                },
                session: {
                    sessionId: s._id,
                    loginAt: s.loginTime,
                    lastSeenAt: s.lastSeenAt,
                    expiresAt: s.expiresAt,
                },
                network: {
                    ip: s.ip,
                },
                device: {
                    userAgent: s.userAgent,
                },
                activity: {
                    lastEndpoint: null,
                    requestCount: 0,
                },
                security: {
                    tokenExpiresAt: s.expiresAt,
                    isSuspicious: false,
                },
            };
        });

        res.status(200).json([{
            activeWindowMinutes: 5,
            generatedAt: new Date(),
            activeUsersCount: usersData.length,
            activeUsers: usersData,
        }]);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSession = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { sessionId } = req.params;
        await Session.findByIdAndDelete(sessionId);
        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};