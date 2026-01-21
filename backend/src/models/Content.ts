import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  category: string;
  content: string;
  author: mongoose.Types.ObjectId;
  tags: string[];
  status: 'Draft' | 'Published' | 'Archived';
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Archived'],
      default: 'Draft',
    },
  },
  { timestamps: true }
);

export const Content = mongoose.model<IContent>('Content', contentSchema);
