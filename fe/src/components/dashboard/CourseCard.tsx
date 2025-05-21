import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, BarChart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { CourseData } from '../../../../project/src/types';

interface CourseCardProps {
  course: CourseData;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  
  const goToCourseDetails = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <Card 
      className="h-full flex flex-col transform transition-all duration-200 hover:translate-y-[-4px]"
      onClick={goToCourseDetails}
    >
      <div 
        className="h-48 bg-cover bg-center relative rounded-t-lg overflow-hidden"
        style={{ backgroundImage: `url(${course.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3">
          <span className={`
            text-xs font-medium px-2 py-1 rounded-full 
            ${course.status === 'published' ? 'bg-green-500 text-white' : 
              course.status === 'draft' ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'}
          `}>
            {course.status === 'published' ? 'Published' : 
             course.status === 'draft' ? 'Draft' : 'In Review'}
          </span>
        </div>
      </div>
      
      <CardContent className="flex-grow">
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>
              Created on {new Date(course.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span>{course.enrolledStudents} students enrolled</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span>{course.duration}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 border-t border-gray-100">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChart className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-2">
              <p className="text-xs text-gray-500">Completion rate</p>
              <p className="text-sm font-medium text-gray-900">{course.completionRate}%</p>
            </div>
          </div>
          <button 
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/courses/${course.id}/edit`);
            }}
          >
            Edit
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;