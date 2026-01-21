
import React from 'react';
import Card from '../components/ui/Card';
import { mockExperiences } from '../constants';

const InterviewExperiences: React.FC = () => {
  const approvedExperiences = mockExperiences.filter(exp => exp.status === 'Approved');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Interview Experience Repository</h1>
      <div className="space-y-6">
        {approvedExperiences.map(exp => (
          <Card key={exp.id}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{exp.company} - {exp.role}</h2>
                <p className="text-sm text-text-secondary">Shared by: {exp.author}</p>
              </div>
              <span className="text-xs font-semibold bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Approved</span>
            </div>
            <p className="mt-4 text-text-secondary whitespace-pre-wrap">{exp.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InterviewExperiences;
