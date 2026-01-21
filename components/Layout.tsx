
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { UserRole } from '../types';
import { Home, BookOpen, Briefcase, Users, FileText, Bot, FilePlus, Settings, LogOut, Menu, X, BarChart2, FolderCog } from 'lucide-react';

const icons = {
  Dashboard: <Home className="h-5 w-5" />,
  Practice: <BookOpen className="h-5 w-5" />,
  Companies: <Briefcase className="h-5 w-5" />,
  Experiences: <Users className="h-5 w-5" />,
  'Resume Builder': <FileText className="h-5 w-5" />,
  'Resume Scorer': <Bot className="h-5 w-5" />,
  'Submit Experience': <FilePlus className="h-5 w-5" />,
  'Drive Management': <Settings className="h-5 w-5" />,
  'Content Management': <FolderCog className="h-5 w-5" />,
  Analytics: <BarChart2 className="h-5 w-5" />,
};

const getNavLinks = (role: UserRole) => {
  switch (role) {
    case UserRole.Student:
      return [
        { name: 'Dashboard', path: '/dashboard', icon: icons.Dashboard },
        { name: 'Practice Arena', path: '/practice', icon: icons.Practice },
        { name: 'Company Zones', path: '/companies', icon: icons.Companies },
        { name: 'Interview Experiences', path: '/experiences', icon: icons.Experiences },
        { name: 'Resume Builder', path: '/resume-builder', icon: icons['Resume Builder'] },
        { name: 'Resume Scorer', path: '/resume-scorer', icon: icons['Resume Scorer'] },
      ];
    case UserRole.Admin:
      return [
        { name: 'Dashboard', path: '/dashboard', icon: icons.Analytics },
        { name: 'Drive Management', path: '/drives', icon: icons['Drive Management'] },
        { name: 'Content Management', path: '/content', icon: icons['Content Management'] },
      ];
    case UserRole.Alumni:
      return [
        { name: 'Dashboard', path: '/dashboard', icon: icons.Dashboard },
        { name: 'Submit Experience', path: '/submit-experience', icon: icons['Submit Experience'] },
      ];
    default:
      return [];
  }
};

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navLinks = user ? getNavLinks(user.role) : [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const Sidebar = () => (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-card border-r border-border transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <h1 className="text-xl font-bold text-accent">PrepACE</h1>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-text-secondary">
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center p-2 space-x-3 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-700 text-text-secondary'
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-border">
         <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 space-x-3 rounded-md text-text-secondary hover:bg-red-800/50 hover:text-white"
        >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background md:flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-card/80 backdrop-blur-sm border-b border-border md:justify-end">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-text-secondary">
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-text-secondary">Welcome, {user?.name}</span>
            <img className="w-8 h-8 rounded-full" src={`https://i.pravatar.cc/150?u=${user?.email}`} alt="user avatar" />
          </div>
        </header>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
