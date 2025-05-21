import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Folder, 
  Users, 
  CalendarClock, 
  BarChart, 
  MessageSquare,
  Settings,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  submenu?: { name: string; path: string }[];
};

const MobileSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const navigation: NavItem[] = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard',
    },
    {
      name: 'Courses',
      icon: <Folder className="w-5 h-5" />,
      path: '/courses',
      badge: 3,
      submenu: [
        { name: 'All Courses', path: '/dashboard' },
        { name: 'Create Course', path: '/courses/create' },
        { name: 'Categories', path: '/courses/categories' },
      ],
    },
    {
      name: 'Students',
      icon: <Users className="w-5 h-5" />,
      path: '/students',
    },
    {
      name: 'Schedule',
      icon: <CalendarClock className="w-5 h-5" />,
      path: '/schedule',
    },
    {
      name: 'Analytics',
      icon: <BarChart className="w-5 h-5" />,
      path: '/analytics',
    },
    {
      name: 'Messages',
      icon: <MessageSquare className="w-5 h-5" />,
      path: '/messages',
      badge: 5,
    },
  ];

  const secondaryNavigation: NavItem[] = [
    {
      name: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/settings',
    },
    {
      name: 'Help & Support',
      icon: <HelpCircle className="w-5 h-5" />,
      path: '/support',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleSubmenu = (name: string) => {
    if (expandedMenu === name) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(name);
    }
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="fixed z-20 top-3 right-4 p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      <div 
        className={`fixed inset-0 z-10 bg-gray-600 bg-opacity-75 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      ></div>
      
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-20 w-full bg-white overflow-y-auto transform transition-transform ease-in-out duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="h-8 w-auto text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
              </span>
              <span className="ml-3 text-xl font-bold text-gray-900">EduCraft</span>
            </div>
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="mt-5 px-2 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div>
                  <button
                    className={`flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedMenu === item.name ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedMenu === item.name && (
                    <div className="mt-1 pl-8 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={`block px-3 py-2 rounded-md text-base ${
                            location.pathname === subItem.path
                              ? 'text-blue-700 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 px-2 pt-4 border-t border-gray-200">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Support
          </h3>
          <div className="mt-2 space-y-1">
            {secondaryNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;