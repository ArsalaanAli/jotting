import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Folder, 
  Users, 
  CalendarClock, 
  BarChart, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  ChevronRight,
  GraduationCap as Graduation,
} from 'lucide-react';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  submenu?: { name: string; path: string }[];
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  
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
    <aside className="fixed inset-y-0 left-0 bg-white w-64 border-r border-gray-200 pt-16 hidden md:block">
      <div className="h-full flex flex-col justify-between overflow-y-auto">
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.submenu ? (
                  <div>
                    <button
                      className={`flex items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium group transition-colors ${
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
                      <ul className="mt-1 pl-8 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.path}
                              className={`block px-3 py-2 rounded-md text-sm ${
                                location.pathname === subItem.path
                                  ? 'text-blue-700 font-medium'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium group transition-colors ${
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
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-4 border-t border-gray-200">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-2 space-y-1">
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Graduation className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Need help?</h3>
                <div className="mt-1 text-xs text-blue-700">
                  Check our documentation or contact support for assistance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;