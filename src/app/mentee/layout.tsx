"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  Calendar, 
  Search, 
  User, 
  Trophy, 
  BookOpen, 
  Bell, 
  Settings
} from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';

const MenteeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('home');
  const user = useAppSelector((state) => state.user);

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/mentee/home' },
    { id: 'sessions', label: 'My Sessions', icon: Calendar, path: '/mentee/sessions' },
    { id: 'find-mentors', label: 'Find Mentors', icon: Search, path: '/mentee/find-mentors' },
    { id: 'profile', label: 'Profile', icon: User, path: '/mentee/profile' },
    { id: 'resources', label: 'Resources', icon: BookOpen, path: '/mentee/resources' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/mentee/notifications' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-white font-semibold text-lg">MentorHub</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  router.push(item.path);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <IconComponent size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">{user?.name || 'User'}</p>
              <p className="text-gray-400 text-xs">Mentee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default MenteeLayout;
