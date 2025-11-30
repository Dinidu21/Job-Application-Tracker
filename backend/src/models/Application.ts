import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  appliedDate: Date;
  notes?: string;
  location?: string;
  salary?: string;
  jobUrl?: string;
  contactEmail?: string;
  contactName?: string;
}

const applicationSchema = new Schema<IApplication>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Please provide a position'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['applied', 'interview', 'offer', 'rejected', 'withdrawn'],
      default: 'applied',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    jobUrl: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
    },
    contactName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
applicationSchema.index({ user: 1, appliedDate: -1 });

const Application = mongoose.model<IApplication>('Application', applicationSchema);
export default Application;

