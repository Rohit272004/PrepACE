
import { User, UserRole, Quiz, InterviewExperience, JobDrive } from './types';

export const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: UserRole.Student, cgpa: 8.5, preparationStatus: { 'TCS': 70, 'Infosys': 55 } },
  { id: 2, name: 'Admin TPO', email: 'admin@example.com', role: UserRole.Admin, cgpa: 0 },
  { id: 3, name: 'Jane Smith', email: 'jane.smith@example.com', role: UserRole.Alumni, cgpa: 9.2 },
  { id: 4, name: 'Peter Jones', email: 'peter.jones@example.com', role: UserRole.Student, cgpa: 7.2, preparationStatus: { 'TCS': 40, 'Accenture': 60 } },
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'quant-1',
    title: 'Quantitative Aptitude Practice',
    subject: 'Quant',
    questions: [
      { id: 1, question: 'What is 2+2?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
      { id: 2, question: 'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?', options: ['120 metres', '180 metres', '324 metres', '150 metres'], correctAnswer: '150 metres' },
    ],
  },
  {
    id: 'dbms-1',
    title: 'DBMS Fundamentals',
    subject: 'DBMS',
    questions: [
      { id: 1, question: 'What is a primary key?', options: ['A unique identifier for a record', 'A foreign key', 'An index', 'A column that can be null'], correctAnswer: 'A unique identifier for a record' },
      { id: 2, question: 'Which normalization form deals with transitive dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctAnswer: '3NF' },
    ],
  },
];

export const mockExperiences: InterviewExperience[] = [
  { id: 1, author: 'Jane Smith', company: 'TCS', role: 'Software Engineer', content: 'The interview process was smooth. They asked about DBMS normalization, my final year project, and a simple coding question on arrays.', status: 'Approved' },
  { id: 2, author: 'Senior Developer', company: 'Infosys', role: 'Systems Engineer', content: 'Be prepared for puzzles in the first round. The technical round was focused on OOP concepts and Java basics.', status: 'Approved' },
  { id: 3, author: 'New Grad', company: 'Accenture', role: 'Associate Software Engineer', content: 'My interview was mostly behavioral. They wanted to see if I was a good fit for the company culture. Only one easy coding question.', status: 'Pending' },
];

export const mockDrives: JobDrive[] = [
    { id: 1, company: 'TCS', role: 'Ninja', minCGPA: 7.0, deadline: '2024-08-15' },
    { id: 2, company: 'Infosys', role: 'Systems Engineer', minCGPA: 6.5, deadline: '2024-08-20' },
];

export const companies = [
  { name: 'TCS', logo: 'https://picsum.photos/seed/tcs/40/40', syllabus: 'NQT focuses on Quantitative Aptitude, Reasoning, Verbal Ability, and Programming Logic.' },
  { name: 'Infosys', logo: 'https://picsum.photos/seed/infosys/40/40', syllabus: 'Focus on Reasoning, Technical Ability (Pseudo Code), Verbal Ability, Numerical Puzzle Ability.' },
  { name: 'Accenture', logo: 'https://picsum.photos/seed/accenture/40/40', syllabus: 'Cognitive and Technical Assessment covering English ability, Critical Reasoning, Abstract Reasoning and Common Applications & MS Office.' },
];
