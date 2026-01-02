import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  loginTime: Date;
  expiresAt: Date;
  lastSeenAt: Date;
  ip?: string;
  userAgent?: string;
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
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index to auto-delete expired sessions

const Session = mongoose.model<ISession>('Session', sessionSchema);
export default Session;