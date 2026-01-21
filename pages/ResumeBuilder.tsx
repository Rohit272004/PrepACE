
import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ResumeBuilder: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Resume Builder</h1>
      <p className="text-text-secondary">Fill in your details to generate a college-approved resume.</p>
      <Card>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary">Full Name</label>
              <input type="text" className="mt-1 w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" defaultValue="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Email</label>
              <input type="email" className="mt-1 w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" defaultValue="john.doe@example.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Education</label>
            <textarea className="mt-1 w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" rows={3} placeholder="e.g., B.E. in Computer Engineering, XYZ College (2021-2025)"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Projects</label>
            <textarea className="mt-1 w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" rows={4} placeholder="Describe your projects..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Skills</label>
            <input type="text" className="mt-1 w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" placeholder="e.g., Java, Python, React, SQL" />
          </div>
          <div className="text-right">
            <Button type="button" disabled>Generate PDF (Feature coming soon)</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ResumeBuilder;
