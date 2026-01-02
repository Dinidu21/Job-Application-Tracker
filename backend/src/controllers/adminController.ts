import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Session from '../models/Session';
import User from '../models/User';

export const getMonitoringData = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Active sessions
        const activeSessions = await Session.find({ expiresAt: { $gt: new Date() } }).populate('userId').lean();

        const activeUsers = activeSessions.map(s => {
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
            activeUsersCount: activeUsers.length,
            activeUsers,
        }]);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

