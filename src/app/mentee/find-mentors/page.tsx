"use client";
import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Clock,
  Calendar,
  ChevronDown,
  MapPin,
  BookOpen,
  MessageCircle
} from 'lucide-react';

const FindMentorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [availability, setAvailability] = useState('all');

  const mentors = [
    {
      id: 1,
      name: 'Dr. Emily Watson',
      expertise: 'Data Science & ML',
      rating: 4.9,
      sessions: 240,
      price: 85,
      location: 'San Francisco, CA',
      availability: '10+ hours/week',
      avatar: '👩‍🔬',
      tags: ['Python', 'TensorFlow', 'Research'],
      about: 'PhD in Machine Learning with 8+ years of industry experience. Specializing in deep learning and computer vision.',
      languages: ['English', 'Mandarin']
    },
    {
      id: 2,
      name: 'Alex Kim',
      expertise: 'Frontend Development',
      rating: 4.8,
      sessions: 180,
      price: 70,
      location: 'New York, NY',
      availability: '15+ hours/week',
      avatar: '👨‍🎨',
      tags: ['React', 'TypeScript', 'Design Systems'],
      about: 'Senior Frontend Engineer passionate about building scalable web applications and mentoring developers.',
      languages: ['English', 'Korean']
    },
    {
      id: 3,
      name: 'Priya Sharma',
      expertise: 'Product Management',
      rating: 4.9,
      sessions: 320,
      price: 90,
      location: 'London, UK',
      availability: '8+ hours/week',
      avatar: '👩‍💼',
      tags: ['Strategy', 'Agile', 'Leadership'],
      about: 'Product leader with experience at top tech companies. Helping aspiring PMs break into the field.',
      languages: ['English', 'Hindi']
    },
    {
      id: 4,
      name: 'Marcus Rodriguez',
      expertise: 'Backend Development',
      rating: 4.7,
      sessions: 150,
      price: 75,
      location: 'Berlin, Germany',
      availability: '12+ hours/week',
      avatar: '👨‍💻',
      tags: ['Node.js', 'Python', 'System Design'],
      about: 'Backend engineer specializing in scalable architectures and distributed systems.',
      languages: ['English', 'Spanish']
    }
  ];

  const expertiseOptions = [
    'all',
    'Frontend Development',
    'Backend Development',
    'Data Science & ML',
    'Product Management',
    'UI/UX Design',
    'DevOps',
    'Mobile Development'
  ];

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100+', value: '100+' }
  ];

  const availabilityOptions = [
    { label: 'Any Availability', value: 'all' },
    { label: '5+ hours/week', value: '5+' },
    { label: '10+ hours/week', value: '10+' },
    { label: '15+ hours/week', value: '15+' }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesExpertise = selectedExpertise === 'all' || mentor.expertise === selectedExpertise;
    
    const matchesPrice = priceRange === 'all' ||
      (priceRange === '0-50' && mentor.price < 50) ||
      (priceRange === '50-100' && mentor.price >= 50 && mentor.price <= 100) ||
      (priceRange === '100+' && mentor.price > 100);

    const matchesAvailability = availability === 'all' ||
      parseInt(mentor.availability) >= parseInt(availability);

    return matchesSearch && matchesExpertise && matchesPrice && matchesAvailability;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Find Mentors</h1>
          <p className="text-gray-400 mt-1">Connect with expert mentors in your field</p>
        </div>
      </header>

      <main className="p-6">
        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search mentors, skills, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Expertise Filter */}
            <div className="relative">
              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Expertise</option>
                {expertiseOptions.slice(1).map((expertise) => (
                  <option key={expertise} value={expertise}>{expertise}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Availability Filter */}
            <div className="relative">
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500"
              >
                {availabilityOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              {/* Mentor Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl">{mentor.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">{mentor.name}</h3>
                  <p className="text-gray-400">{mentor.expertise}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-yellow-400">
                      <Star className="fill-current" size={16} />
                      <span className="ml-1 text-white">{mentor.rating}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {mentor.sessions} sessions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${mentor.price}</p>
                  <p className="text-gray-400 text-sm">per hour</p>
                </div>
              </div>

              {/* About */}
              <p className="text-gray-400 text-sm mb-4">{mentor.about}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin size={16} />
                  <span>{mentor.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock size={16} />
                  <span>{mentor.availability}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Calendar size={16} />
                  <span>Book Session</span>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg transition-colors">
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
            <BookOpen className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-white font-semibold text-lg mb-2">No mentors found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedExpertise('all');
                setPriceRange('all');
                setAvailability('all');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default FindMentorsPage;