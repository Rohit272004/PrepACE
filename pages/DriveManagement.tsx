
import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockDrives } from '../constants';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

const DriveManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Drive Management</h1>
        <Button><PlusCircle className="mr-2 h-5 w-5" /> Post New Drive</Button>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Post a New Job Drive</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Company Name" className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" />
            <input type="text" placeholder="Role" className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" />
            <input type="number" step="0.1" placeholder="Minimum CGPA" className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" />
            <input type="date" className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md" />
          </div>
          <div className="text-right">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Existing Drives</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2">Company</th>
                <th className="p-2">Role</th>
                <th className="p-2">Min CGPA</th>
                <th className="p-2">Deadline</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDrives.map(drive => (
                <tr key={drive.id} className="border-b border-gray-700">
                  <td className="p-2">{drive.company}</td>
                  <td className="p-2">{drive.role}</td>
                  <td className="p-2">{drive.minCGPA}</td>
                  <td className="p-2">{drive.deadline}</td>
                  <td className="p-2 flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300"><Edit size={18} /></button>
                    <button className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DriveManagement;
