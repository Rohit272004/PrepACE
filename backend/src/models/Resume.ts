import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  lastScored?: Date;
  scoreResult?: string;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user ID'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide resume content'],
    },
    lastScored: {
      type: Date,
    },
    scoreResult: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Resume = mongoose.model<IResume>('Resume', resumeSchema);
