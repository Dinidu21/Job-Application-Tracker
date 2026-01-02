import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Session from '../models/Session';
import User from '../models/User';

export const getMonitoringData = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const days = parseInt(req.query.days as string) || 7;
        const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

        // Active sessions
        const activeSessions = await Session.find({ expiresAt: { $gt: new Date() } }).populate('userId').lean();

        // Newly registered
        const newUsers = await User.find({ createdAt: { $gte: cutoff } }).lean();

        res.status(200).json({
            activeSessions: activeSessions.map(s => ({
                user: s.userId,
                loginTime: s.loginTime,
                expiresAt: s.expiresAt,
            })),
            newUsers,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
