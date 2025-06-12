"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, 
  Star, 
  Calendar,
  ChevronDown,
  BookOpen,
  MessageCircle,
  Clock
} from 'lucide-react';
import { apiUtility } from '@/utils/Api';

interface Mentor {
  id: string;
  experience: number;
  rating: number;
  availability: boolean;
  skills: string[];
  tags: string[];
  user: {
    name: string;
  };
}

const FindMentorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [showAvailable, setShowAvailable] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  // Skill options - you might want to fetch these from the backend
  const skillOptions = [
    'JavaScript',
    'Python',
    'React',
    'Node.js',
    'Machine Learning',
    'System Design',
    'DevOps',
    'Cloud Computing'
  ];

  // Tag options - you might want to fetch these from the backend
  const tagOptions = [
    'Frontend',
    'Backend',
    'Full Stack',
    'Data Science',
    'Mobile Development',
    'UI/UX',
    'Architecture'
  ];

  const experienceOptions = [
    { label: 'Any Experience', value: 0 },
    { label: '2+ years', value: 2 },
    { label: '5+ years', value: 5 },
    { label: '8+ years', value: 8 }
  ];

  const fetchMentors = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiUtility.searchMentors({
        skills: selectedSkills.length > 0 ? selectedSkills : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        minExperience: minExperience > 0 ? minExperience : undefined,
        available: showAvailable || undefined,
        rating: minRating > 0 ? minRating : undefined,
        name: searchQuery || undefined
      });
      setMentors(response.mentors);
    } catch (err) {
      setError('Failed to fetch mentors. Please try again later.');
      console.error('Error fetching mentors:', err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedSkills, selectedTags, minExperience, showAvailable, minRating]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchMentors();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [fetchMentors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (skillsRef.current && !skillsRef.current.contains(event.target as Node)) {
        setShowSkillsDropdown(false);
      }
      if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
        setShowTagsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
    setSelectedTags([]);
    setMinExperience(0);
    setShowAvailable(false);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Find Mentors</h1>
          <p className="text-gray-400 text-lg">Connect with expert mentors in your field</p>
        </div>
      </header>

      <main className="p-6">
        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 mb-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search mentors by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Skills Filter */}
            <div className="relative" ref={skillsRef}>
              <button
                onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-left text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 flex justify-between items-center"
              >
                <span className={selectedSkills.length === 0 ? "text-gray-400" : "text-white"}>
                  {selectedSkills.length === 0 ? "Select Skills" : `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`}
                </span>
                <ChevronDown className={`transform transition-transform duration-300 ${showSkillsDropdown ? 'rotate-180' : ''}`} size={20} />
              </button>
              {showSkillsDropdown && (
                <div className="absolute z-50 w-full mt-2 py-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                  {skillOptions.map((skill) => (
                    <div
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700/50 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded border ${selectedSkills.includes(skill) ? 'bg-blue-500 border-blue-500' : 'border-gray-600'} mr-3 flex items-center justify-center`}>
                        {selectedSkills.includes(skill) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-white">{skill}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags Filter */}
            <div className="relative" ref={tagsRef}>
              <button
                onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-left text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 flex justify-between items-center"
              >
                <span className={selectedTags.length === 0 ? "text-gray-400" : "text-white"}>
                  {selectedTags.length === 0 ? "Select Tags" : `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`}
                </span>
                <ChevronDown className={`transform transition-transform duration-300 ${showTagsDropdown ? 'rotate-180' : ''}`} size={20} />
              </button>
              {showTagsDropdown && (
                <div className="absolute z-50 w-full mt-2 py-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                  {tagOptions.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700/50 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded border ${selectedTags.includes(tag) ? 'bg-blue-500 border-blue-500' : 'border-gray-600'} mr-3 flex items-center justify-center`}>
                        {selectedTags.includes(tag) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-white">{tag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Experience Filter */}
            <div className="relative">
              <select
                value={minExperience}
                onChange={(e) => setMinExperience(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              >
                {experienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center space-x-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showAvailable}
                  onChange={(e) => setShowAvailable(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-white">Show Available Only</span>
              </label>
            </div>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 border border-gray-600 hover:border-gray-500"
            >
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Selected Filters */}
          {(selectedSkills.length > 0 || selectedTags.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-sm"
                >
                  {skill}
                  <button
                    onClick={() => toggleSkill(skill)}
                    className="ml-2 hover:text-blue-300 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-sm"
                >
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-2 hover:text-purple-300 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4 text-lg">Finding the perfect mentors for you...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}

        {/* Mentors Grid */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div 
                key={mentor.id} 
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {mentor.user.name.charAt(0)}
                    </div>
                    {mentor.availability && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{mentor.user.name}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-yellow-400">
                        <Star className="fill-current" size={16} />
                        <span className="ml-1 text-white">{mentor.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock size={14} className="mr-1" />
                        <span>{mentor.experience} years exp.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {mentor.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25 group">
                    <Calendar size={18} className="group-hover:scale-110 transition-transform" />
                    <span>Book Session</span>
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-2.5 rounded-xl transition-colors flex items-center justify-center shadow-lg hover:shadow-gray-700/25 group">
                    <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && mentors.length === 0 && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 border border-gray-700 text-center">
            <BookOpen className="mx-auto text-gray-600 mb-6" size={64} />
            <h3 className="text-white font-semibold text-2xl mb-3">No mentors found</h3>
            <p className="text-gray-400 mb-8 text-lg">Try adjusting your filters or search terms</p>
            <button 
              onClick={resetFilters}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
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