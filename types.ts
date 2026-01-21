
export enum UserRole {
  Student = 'Student',
  Admin = 'Admin',
  Alumni = 'Alumni',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  cgpa: number;
  preparationStatus?: {
    [company: string]: number;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: QuizQuestion[];
}

export interface InterviewExperience {
  id: number;
  author: string;
  company: string;
  role: string;
  content: string;
  status: 'Pending' | 'Approved';
}

export interface JobDrive {
  id: number;
  company: string;
  role: string;
  minCGPA: number;
  deadline: string;
}
