import React from 'react';
import { Users, Folder, BarChart2, Award } from 'lucide-react';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Folder className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Courses</p>
            <p className="text-2xl font-semibold text-gray-900">24</p>
            <div className="flex items-center mt-1">
              <span className="text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">+12%</span>
              <span className="text-xs text-gray-500 ml-1.5">from last month</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
            <Users className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Students</p>
            <p className="text-2xl font-semibold text-gray-900">368</p>
            <div className="flex items-center mt-1">
              <span className="text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">+8%</span>
              <span className="text-xs text-gray-500 ml-1.5">from last month</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Completion Rate</p>
            <p className="text-2xl font-semibold text-gray-900">78%</p>
            <div className="flex items-center mt-1">
              <span className="text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">+5%</span>
              <span className="text-xs text-gray-500 ml-1.5">from last month</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
            <BarChart2 className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">$14,590</p>
            <div className="flex items-center mt-1">
              <span className="text-xs font-medium text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full">-3%</span>
              <span className="text-xs text-gray-500 ml-1.5">from last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;