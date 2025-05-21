import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <MobileSidebar />
      
      <main className="pt-16 md:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          {title && (
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;