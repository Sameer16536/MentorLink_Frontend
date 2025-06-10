"use client";
import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Book, 
  Edit2,
  Github,
  Linkedin,
  Globe,
  Calendar
} from 'lucide-react';

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const interests = ['Web Development', 'Machine Learning', 'Cloud Computing', 'UI/UX Design'];
  const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'];

  const personalInfo = [
    { icon: Mail, label: 'Email', value: user?.email || 'user@example.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
    { icon: Briefcase, label: 'Occupation', value: 'Software Engineer' },
    { icon: Book, label: 'Education', value: 'B.S. Computer Science' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', value: 'github.com/username' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/username' },
    { icon: Globe, label: 'Portfolio', value: 'portfolio.com' },
  ];

  const mentoringSessions = [
    { date: '2024-06-15', topic: 'React Advanced Patterns', mentor: 'Sarah Chen' },
    { date: '2024-06-08', topic: 'System Design Fundamentals', mentor: 'David Park' },
    { date: '2024-05-30', topic: 'Career Development', mentor: 'Marcus Rodriguez' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Profile</h1>
            <p className="text-gray-400 mt-1">Manage your personal information and preferences</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Edit2 size={16} />
            <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
          </button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Profile Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-3xl font-bold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{user?.name || 'User Name'}</h2>
                <p className="text-gray-400 text-sm text-center">Aspiring Developer | Learning Enthusiast</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              <div className="space-y-4">
                {personalInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 text-gray-400">
                      <IconComponent size={16} />
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="text-white">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
              <div className="space-y-4">
                {socialLinks.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 text-gray-400">
                      <IconComponent size={16} />
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <a href={`https://${item.value}`} className="text-blue-400 hover:text-blue-300">
                          {item.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle and Right Columns */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">About Me</h3>
              <p className="text-gray-400">
                Passionate software developer with a keen interest in modern web technologies and artificial intelligence. 
                Currently focused on expanding my knowledge in full-stack development and cloud architecture. 
                Always eager to learn from experienced mentors and contribute to meaningful projects.
              </p>
            </div>

            {/* Skills & Interests */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Skills */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Learning Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Mentoring Sessions</h3>
              <div className="space-y-4">
                {mentoringSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar size={16} />
                        <span>{session.date}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{session.topic}</p>
                        <p className="text-gray-400 text-sm">with {session.mentor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;