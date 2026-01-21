
import React from 'react';
import Card from '../components/ui/Card';
import { companies } from '../constants';

const CompanyZones: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Company-Specific Prep Zones</h1>
      <div className="space-y-6">
        {companies.map(company => (
          <Card key={company.name}>
            <div className="flex items-center space-x-4">
              <img src={company.logo} alt={`${company.name} logo`} className="w-12 h-12 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold">{company.name}</h2>
                <p className="text-text-secondary mt-2">{company.syllabus}</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Past Year Questions (PYQs)</h3>
              <ul className="list-disc list-inside mt-2 text-text-secondary">
                <li>What is the difference between Array and LinkedList?</li>
                <li>Write a SQL query to find the second highest salary.</li>
                <li>Solve the Tower of Hanoi problem.</li>
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompanyZones;
