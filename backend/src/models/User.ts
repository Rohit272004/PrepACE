import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  Student = 'Student',
  Admin = 'Admin',
  Alumni = 'Alumni',
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  cgpa: number;
  preparationStatus?: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Student,
    },
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    preparationStatus: {
      type: Map,
      of: Number,
      default: new Map(),
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const bcrypt = await import('bcryptjs');
    const salt = await bcrypt.default.genSalt(10);
    this.password = await bcrypt.default.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs');
  return await bcrypt.default.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
