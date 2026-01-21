
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { UserRole } from '../types';
import Button from '../components/ui/Button';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('john.doe@example.com');
  const [role, setRole] = useState<UserRole>(UserRole.Student);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    // Automatically switch email for demo purposes
    if (newRole === UserRole.Admin) {
      setEmail('admin@example.com');
    } else if (newRole === UserRole.Alumni) {
      setEmail('jane.smith@example.com');
    } else {
      setEmail('john.doe@example.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card border border-border rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-center text-accent">PrepACE Portal</h1>
          <p className="mt-2 text-center text-text-secondary">Login to your account</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-text-secondary">
              Select Your Role
            </label>
            <div className="mt-1">
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md focus:outline-none focus:ring-accent focus:border-accent"
              >
                <option value={UserRole.Student}>Student</option>
                <option value={UserRole.Admin}>Admin (TPO)</option>
                <option value={UserRole.Alumni}>Alumni/Senior</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-text-primary bg-gray-700 border border-border rounded-md focus:outline-none focus:ring-accent focus:border-accent"
              />
            </div>
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full">
              Sign In as {role}
            </Button>
          </div>
        </form>
         <div className="text-center text-xs text-text-secondary mt-4 p-3 bg-gray-800/50 rounded-lg">
            <p className="font-semibold text-accent mb-1">Demo Credentials:</p>
            <p>Admin: admin@example.com</p>
            <p>Student: john.doe@example.com</p>
            <p>Alumni: jane.smith@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
