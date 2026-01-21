import mongoose, { Schema, Document } from 'mongoose';

export interface IJobDrive extends Document {
  _id: mongoose.Types.ObjectId;
  company: string;
  role: string;
  minCGPA: number;
  deadline: Date;
  description?: string;
  applicants: mongoose.Types.ObjectId[];
  status: 'Active' | 'Closed' | 'Completed';
  createdAt: Date;
  updatedAt: Date;
}

const jobDriveSchema = new Schema<IJobDrive>(
  {
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please provide a role'],
      trim: true,
    },
    minCGPA: {
      type: Number,
      required: [true, 'Please provide minimum CGPA'],
      min: 0,
      max: 10,
    },
    deadline: {
      type: Date,
      required: [true, 'Please provide a deadline'],
    },
    description: {
      type: String,
      trim: true,
    },
    applicants: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    status: {
      type: String,
      enum: ['Active', 'Closed', 'Completed'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

export const JobDrive = mongoose.model<IJobDrive>('JobDrive', jobDriveSchema);
