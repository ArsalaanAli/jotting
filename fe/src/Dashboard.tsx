import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, SlidersHorizontal } from 'lucide-react';
import DashboardLayout from './components/layout/DashboardLayout';
import Button from './components/ui/Button';
import CourseCard from './components/dashboard/CourseCard';
import DashboardStats from './components/dashboard/DashboardStats';
import { MOCK_COURSES } from './mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout title="Dashboard">
      <DashboardStats />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold text-gray-900">Your Courses</h2>
          <p className="text-sm text-gray-500">Manage and organize your course offerings</p>
        </div>
        
        <Button
          onClick={() => navigate('/courses/create')}
          icon={<PlusCircle className="h-5 w-5" />}
        >
          Create New Course
        </Button>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="review">In Review</option>
              </select>
            </div>
          </div>
        </div>
        
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No courses found</h3>
            <p className="text-sm text-gray-500 mb-4">
              {searchQuery
                ? `No courses match "${searchQuery}"`
                : "You don't have any courses matching these filters."
              }
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;