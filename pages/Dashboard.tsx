
import React from 'react';
import useAuth from '../hooks/useAuth';
import { UserRole } from '../types';
import Card from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockUsers, mockDrives, mockExperiences } from '../constants';
import { Award, Briefcase, FileCheck, Users } from 'lucide-react';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const prepData = user?.preparationStatus ? Object.entries(user.preparationStatus).map(([name, value]) => ({ name, value })) : [];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card><div className="flex items-center space-x-4"><Award className="text-accent" size={32}/><div><h3 className="font-bold">CGPA</h3><p className="text-2xl">{user?.cgpa}</p></div></div></Card>
                <Card><div className="flex items-center space-x-4"><Briefcase className="text-accent" size={32}/><div><h3 className="font-bold">Drives Applied</h3><p className="text-2xl">2</p></div></div></Card>
                <Card><div className="flex items-center space-x-4"><FileCheck className="text-accent" size={32}/><div><h3 className="font-bold">Quizzes Taken</h3><p className="text-2xl">5</p></div></div></Card>
                <Card><div className="flex items-center space-x-4"><Users className="text-accent" size={32}/><div><h3 className="font-bold">Experiences Read</h3><p className="text-2xl">10</p></div></div></Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Preparation Status</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={prepData}>
                            <XAxis dataKey="name" stroke="#d1d5db" />
                            <YAxis stroke="#d1d5db" />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                            <Legend />
                            <Bar dataKey="value" fill="#3b82f6" name="Readiness (%)" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Upcoming Drives</h2>
                     <ul className="space-y-4">
                        {mockDrives.map(drive => (
                            <li key={drive.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-md">
                                <div>
                                    <h3 className="font-bold">{drive.company} - {drive.role}</h3>
                                    <p className="text-sm text-text-secondary">Min CGPA: {drive.minCGPA}</p>
                                </div>
                                <span className="text-sm">Deadline: {drive.deadline}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

const AdminDashboard: React.FC = () => {
    const students = mockUsers.filter(u => u.role === UserRole.Student);
    const placementData = [{name: 'Placed', value: 30}, {name: 'Unplaced', value: 70}];
    const COLORS = ['#3b82f6', '#ef4444'];
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Admin Dashboard (Analytics)</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Placement Status</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={placementData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {placementData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
                 <Card>
                    <h2 className="text-xl font-semibold mb-4">Student Leaderboard (by CGPA)</h2>
                    <ul className="space-y-2">
                        {students.sort((a,b) => b.cgpa - a.cgpa).slice(0, 5).map(student => (
                            <li key={student.id} className="flex justify-between p-2 bg-gray-700 rounded">
                                <span>{student.name}</span>
                                <span className="font-bold text-accent">{student.cgpa}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

const AlumniDashboard: React.FC = () => (
     <div className="space-y-8">
        <h1 className="text-3xl font-bold">Alumni Dashboard</h1>
        <Card>
            <h2 className="text-xl font-semibold">Share Your Wisdom</h2>
            <p className="text-text-secondary mt-2">Help juniors by sharing your interview experience. Your insights are invaluable for their preparation.</p>
        </Card>
         <Card>
            <h2 className="text-xl font-semibold">Mock Interviews</h2>
             <div className="flex items-center space-x-2 mt-4">
                 <label htmlFor="mock-toggle" className="text-text-secondary">Available for Mock Interviews:</label>
                 <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="mock-toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                    <label htmlFor="mock-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer"></label>
                </div>
            </div>
             <style>{`
                .toggle-checkbox:checked { right: 0; border-color: #3b82f6; }
                .toggle-checkbox:checked + .toggle-label { background-color: #3b82f6; }
            `}</style>
        </Card>
    </div>
);


const Dashboard: React.FC = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case UserRole.Student:
      return <StudentDashboard />;
    case UserRole.Admin:
      return <AdminDashboard />;
    case UserRole.Alumni:
      return <AlumniDashboard />;
    default:
      return <div>Welcome!</div>;
  }
};

export default Dashboard;
