import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  loginTime: Date;
  expiresAt: Date;
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
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index to auto-delete expired sessions

const Session = mongoose.model<ISession>('Session', sessionSchema);
export default Session;