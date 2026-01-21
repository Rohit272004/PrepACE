
import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ExperienceSubmission: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Submit Your Interview Experience</h1>
      <p className="text-text-secondary">
        Pay it forward! Help your juniors by detailing your selection process, questions asked, and any tips you have.
      </p>
      <Card>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary">Company Name</label>
              <input type="text" placeholder="e.g., TCS" className="mt-1 w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Role / Position</label>
              <input type="text" placeholder="e.g., Software Engineer" className="mt-1 w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Interview Experience</label>
            <textarea 
              rows={10} 
              placeholder="Describe the interview rounds, questions asked (technical & HR), and any tips for juniors..." 
              className="mt-1 w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md"
            ></textarea>
          </div>
          <div className="text-right">
            <Button type="submit">Submit for Review</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ExperienceSubmission;
