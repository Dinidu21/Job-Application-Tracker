import axios from 'axios';

interface GeoLocation {
    status: string;
    country?: string;
    countryCode?: string;
    region?: string;
    regionName?: string;
    city?: string;
    zip?: string;
    lat?: number;
    lon?: number;
    timezone?: string;
    isp?: string;
    org?: string;
    as?: string;
    query?: string;
    message?: string;
}

export const getIpGeoLocation = async (ip: string): Promise<GeoLocation> => {
    // Handle localhost/private IPs that ip-api won't resolve effectively
    if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
        return {
            status: 'success',
            country: 'Localhost',
            city: 'Local Network',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            isp: 'Local Development'
        };
    }

    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        return response.data;
    } catch (error: any) {
        console.error('Geo fetch failed:', error.message);
        return {
            status: 'fail',
            message: 'Geolocation fetch failed'
        };
    }
};
