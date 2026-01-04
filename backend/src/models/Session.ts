import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  loginTime: Date;
  expiresAt: Date;
  lastSeenAt: Date;
  ip?: string;
  userAgent?: string;
  deviceType?: string;
  geo?: {
    status?: string;
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
  };
}

const sessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    loginTime: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    deviceType: {
      type: String,
    },
    geo: {
      status: String,
      country: String,
      countryCode: String,
      region: String,
      regionName: String,
      city: String,
      zip: String,
      lat: Number,
      lon: Number,
      timezone: String,
      isp: String,
      org: String,
      as: String,
      query: String,
      message: String
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index to auto-delete expired sessions

const Session = mongoose.model<ISession>('Session', sessionSchema);
export default Session;