import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizQuestion {
  _id?: mongoose.Types.ObjectId;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface IQuiz extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  subject: string;
  description?: string;
  questions: IQuizQuestion[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const quizQuestionSchema = new Schema<IQuizQuestion>({
  question: {
    type: String,
    required: [true, 'Please provide a question'],
  },
  options: {
    type: [String],
    required: [true, 'Please provide options'],
    validate: {
      validator: (v: string[]) => v.length >= 2 && v.every((option: string) => option.trim().length > 0),
      message: 'At least 2 options are required',
    },
  },
  correctAnswer: {
    type: String,
    required: [true, 'Please provide the correct answer'],
  },
});

const quizSchema = new Schema<IQuiz>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    questions: [quizQuestionSchema],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);
