import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap as Graduation, Bell } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Graduation className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">EduCraft</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;