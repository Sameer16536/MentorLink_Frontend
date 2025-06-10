"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  Star,
  Clock,
  Users,
  TrendingUp,
  MessageCircle,
  Video,
  Filter,
  ChevronRight,
  Calendar,
  Trophy
} from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';

const MenteeHomepage = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Sarah Chen',
      topic: 'Product Strategy',
      time: '2:00 PM Today',
      duration: '45 min',
      type: 'video',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      mentor: 'Marcus Rodriguez',
      topic: 'Career Growth',
      time: '10:00 AM Tomorrow',
      duration: '60 min',
      type: 'call',
      avatar: '👨‍💻'
    }
  ];

  const recommendedMentors = [
    {
      id: 1,
      name: 'Dr. Emily Watson',
      expertise: 'Data Science & ML',
      rating: 4.9,
      sessions: 240,
      price: '$85/hour',
      avatar: '👩‍🔬',
      tags: ['Python', 'TensorFlow', 'Research']
    },
    {
      id: 2,
      name: 'Alex Kim',
      expertise: 'Frontend Development',
      rating: 4.8,
      sessions: 180,
      price: '$70/hour',
      avatar: '👨‍🎨',
      tags: ['React', 'TypeScript', 'Design']
    },
    {
      id: 3,
      name: 'Priya Sharma',
      expertise: 'Product Management',
      rating: 4.9,
      sessions: 320,
      price: '$90/hour',
      avatar: '👩‍💼',
      tags: ['Strategy', 'Agile', 'Leadership']
    }
  ];

  const quickActions = [
    { 
      title: 'Book a Session', 
      description: 'Find and book time with expert mentors',
      icon: Calendar,
      color: 'from-blue-600 to-purple-600'
    },
    { 
      title: 'Browse Mentors', 
      description: 'Explore mentors in your field',
      icon: Users,
      color: 'from-green-600 to-teal-600'
    },
    { 
      title: 'Join Community', 
      description: 'Connect with fellow mentees',
      icon: MessageCircle,
      color: 'from-orange-600 to-red-600'
    },
    { 
      title: 'Track Progress', 
      description: 'Monitor your learning journey',
      icon: TrendingUp,
      color: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-gray-400 mt-1">Ready to accelerate your learning journey?</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => router.push('/mentee/find-mentors')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Book Session
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-6 space-y-8">
        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 cursor-pointer group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Upcoming Sessions</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center">
                View all <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{session.avatar}</div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{session.mentor}</h3>
                          <p className="text-gray-400">{session.topic}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {session.type === 'video' ? <Video size={14} /> : <MessageCircle size={14} />}
                              <span>{session.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                          Reschedule
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
                <Calendar className="mx-auto text-gray-600 mb-4" size={48} />
                <h3 className="text-white font-semibold text-lg mb-2">No upcoming sessions</h3>
                <p className="text-gray-400 mb-6">Book your first session to get started on your learning journey</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Find Mentors
                </button>
              </div>
            )}
          </div>

          {/* Recommended Mentors */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Recommended Mentors</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                <Filter size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              {recommendedMentors.map((mentor) => (
                <div key={mentor.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{mentor.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{mentor.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{mentor.expertise}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="fill-yellow-400 text-yellow-400" size={12} />
                          <span>{mentor.rating}</span>
                        </div>
                        <span>{mentor.sessions} sessions</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {mentor.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">{mentor.price}</span>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Your Learning Progress</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Sessions Completed</h3>
                <Calendar className="text-blue-400" size={24} />
              </div>
              <p className="text-3xl font-bold text-white mb-2">12</p>
              <p className="text-gray-400 text-sm">+3 this month</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Hours Learned</h3>
                <Clock className="text-green-400" size={24} />
              </div>
              <p className="text-3xl font-bold text-white mb-2">24</p>
              <p className="text-gray-400 text-sm">+6 this month</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Skills Gained</h3>
                <Trophy className="text-yellow-400" size={24} />
              </div>
              <p className="text-3xl font-bold text-white mb-2">8</p>
              <p className="text-gray-400 text-sm">+2 this month</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MenteeHomepage;