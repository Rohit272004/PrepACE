
import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockExperiences } from '../constants';
import { Check, X } from 'lucide-react';

const ContentManagement: React.FC = () => {
    const pendingExperiences = mockExperiences.filter(e => e.status === 'Pending');
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Content Management System</h1>
      
      <Card>
        <h2 className="text-xl font-bold mb-4">Manage Quiz Questions</h2>
        {/* Simplified form for adding questions */}
        <form className="space-y-4">
            <select className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md">
                <option>Quantitative Aptitude</option>
                <option>DBMS</option>
                <option>Operating Systems</option>
            </select>
            <textarea placeholder="Question text" rows={2} className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md"></textarea>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Option 1" className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" />
                <input type="text" placeholder="Option 2" className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" />
                <input type="text" placeholder="Option 3" className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" />
                <input type="text" placeholder="Correct Answer" className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-green-500 rounded-md" />
            </div>
            <div className="text-right">
                <Button>Add Question</Button>
            </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Approve Interview Experiences</h2>
        <div className="space-y-4">
            {pendingExperiences.length > 0 ? pendingExperiences.map(exp => (
                <div key={exp.id} className="p-4 bg-gray-700 rounded-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold">{exp.company} - {exp.role}</h3>
                            <p className="text-sm text-text-secondary">By: {exp.author}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="secondary" className="!p-2"><Check size={18} /></Button>
                            <Button variant="danger" className="!p-2"><X size={18} /></Button>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">{exp.content}</p>
                </div>
            )) : <p className="text-text-secondary">No pending experiences to review.</p>}
        </div>
      </Card>
    </div>
  );
};

export default ContentManagement;
