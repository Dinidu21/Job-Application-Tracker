import { Response } from 'express';
import { UAParser } from 'ua-parser-js';
import { AuthRequest } from '../middleware/authMiddleware';
import Session from '../models/Session';
import User from '../models/User';

export const getMonitoringData = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Fetch ALL sessions (remove expiresAt filter to include inactive/historical ones)
        const allSessions = await Session.find({}).populate('userId').lean();

        const usersData = allSessions.filter(s => s.userId).map(s => {
            const user = s.userId as any;

            const parser = new UAParser(s.userAgent);
            const browser = parser.getBrowser();
            const os = parser.getOS();
            const device = parser.getDevice();
            const cpu = parser.getCPU();

            return {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    accountStatus: user.accountStatus || 'active',
                    createdAt: user.createdAt,
                    lastLoginAt: user.lastLoginAt,
                    lastSeenAt: user.lastSeenAt,
                },
                session: {
                    sessionId: s._id,
                    loginAt: s.loginTime,
                    lastSeenAt: s.lastSeenAt,
                    expiresAt: s.expiresAt,
                    deviceType: device.type || s.deviceType || 'desktop', // Use parsed type or fallback
                    userAgent: s.userAgent,
                    browser: browser.name || 'Unknown',
                    browser_major: browser.major || '',
                    os: os.name || 'Unknown',
                    os_version: os.version || '',
                    os_arch: cpu.architecture || '',
                    device_Vendor: device.vendor || '',
                    device_Model: device.model || '',
                    IP: s.ip,
                    geo: s.geo,
                },
                activity: {
                    lastEndpoint: null,
                    requestCount: 0,
                    averageRequestsPerMinute: 0,
                    pagesVisited: [],
                },
                security: {
                    tokenExpiresAt: s.expiresAt,
                    isSuspicious: false,
                    flags: [],
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