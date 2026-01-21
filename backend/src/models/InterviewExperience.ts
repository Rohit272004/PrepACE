import mongoose, { Schema, Document } from 'mongoose';

export interface IInterviewExperience extends Document {
  _id: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  company: string;
  role: string;
  content: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const interviewExperienceSchema = new Schema<IInterviewExperience>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide an author'],
    },
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
    content: {
      type: String,
      required: [true, 'Please provide experience content'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

export const InterviewExperience = mongoose.model<IInterviewExperience>(
  'InterviewExperience',
  interviewExperienceSchema
);
