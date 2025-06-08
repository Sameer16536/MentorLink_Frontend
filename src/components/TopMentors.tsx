"use client";
import React, { useState } from "react";
import Image from "next/image";

const TopMentors = ({ mentors = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("Software");

  const categories = [
    "Software",
    "Data & AI",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "Mobile Development",
    "Web Development",
    "Machine Learning",
  ];

  // Sample mentor data - replace with your backend data
  const sampleMentors = [
    {
      id: 1,
      name: "GenZ Career",
      title: "Senior Software Developer",
      description:
        "I'm a Senior Software Developer with extensive experience in full-stack development and career guidance.",
      image: "https://picsum.photos/200/300",
      category: "Software",
    },
    {
      id: 2,
      name: "Sidharth Shukla",
      title: "Sr SDET @Amazon-USA",
      description:
        "Sr SDET @Amazon-USA | Featured in TimesSquare | Mentor helping aspiring engineers.",
      image: "https://picsum.photos/200/300",
      category: "Software",
    },
    {
      id: 3,
      name: "Nishchay Agrawal",
      title: "SDE-III (Data Engineer -3)",
      description:
        "SDE-III (Data Engineer -3) at Walmart ❤️ | SDE-2 at Amazon | Expert in data engineering.",
      image: "https://picsum.photos/200/300",
      category: "Data & AI",
    },
    {
      id: 4,
      name: "Alex Chen",
      title: "Cloud Solutions Architect",
      description:
        "AWS Certified Solutions Architect | Specializing in cloud architecture and DevOps practices.",
      image: "https://picsum.photos/200/300",
      category: "Cloud Computing",
    },
    {
      id: 5,
      name: "Sarah Williams",
      title: "Cybersecurity Expert",
      description:
        "CISSP certified | 10+ years in information security | Specializing in application security and threat modeling.",
      image: "https://picsum.photos/200/300",
      category: "Cybersecurity",
    },
    {
      id: 6,
      name: "Mike Zhang",
      title: "ML Engineer @Google",
      description:
        "Machine Learning Engineer at Google | PhD in AI | Specialized in deep learning and natural language processing.",
      image: "https://picsum.photos/200/300",
      category: "Machine Learning",
    },
    {
      id: 7,
      name: "Emily Rodriguez",
      title: "DevOps Lead @Netflix",
      description:
        "Leading DevOps practices at Netflix | Kubernetes expert | Helping teams achieve continuous deployment excellence.",
      image: "https://picsum.photos/200/300",
      category: "DevOps",
    },
    {
      id: 8,
      name: "Ryan Patel",
      title: "Mobile Dev Expert",
      description:
        "Senior Mobile Developer with expertise in iOS/Android | Ex-Uber | Flutter & React Native specialist.",
      image: "https://picsum.photos/200/300",
      category: "Mobile Development",
    },
    {
      id: 9,
      name: "Lisa Chen",
      title: "Frontend Architect",
      description:
        "Frontend Architect at Meta | React.js expert | Performance optimization specialist | Web accessibility advocate.",
      image: "https://picsum.photos/200/300",
      category: "Web Development",
    },
    {
      id: 10,
      name: "David Kim",
      title: "Data Science Director",
      description:
        "Director of Data Science at Spotify | Statistics PhD | Expert in big data analytics and machine learning.",
      image: "https://picsum.photos/200/300",
      category: "Data & AI",
    },
    {
      id: 11,
      name: "Rachel Green",
      title: "Security Engineer @Microsoft",
      description:
        "Senior Security Engineer at Microsoft | Ethical Hacker | Specialized in cloud security and penetration testing.",
      image: "https://picsum.photos/200/300",
      category: "Cybersecurity",
    },
    {
      id: 12,
      name: "Tom Wilson",
      title: "Cloud Native Expert",
      description:
        "Multi-cloud architect | AWS/Azure/GCP certified | Helping companies modernize their infrastructure.",
      image: "https://picsum.photos/200/300",
      category: "Cloud Computing",
    },
    {
      id: 13,
      name: "Priya Sharma",
      title: "Full Stack Lead",
      description:
        "Tech Lead at Airbnb | Full Stack Expert | Mentoring developers in modern web development practices.",
      image: "https://picsum.photos/200/300",
      category: "Web Development",
    },
    {
      id: 14,
      name: "Marcus Johnson",
      title: "ML Research Scientist",
      description:
        "AI/ML Research Scientist at OpenAI | Focusing on reinforcement learning and computer vision.",
      image: "https://picsum.photos/200/300",
      category: "Machine Learning",
    },
    {
      id: 15,
      name: "Ana Martinez",
      title: "Mobile Innovation Lead",
      description:
        "Mobile Development Lead at Twitter | AR/VR enthusiast | Expert in cross-platform development.",
      image: "https://picsum.photos/200/300",
      category: "Mobile Development",
    },
  ];

  const displayMentors = mentors.length > 0 ? mentors : sampleMentors;
  const filteredMentors = displayMentors.filter(
    (mentor) => mentor.category === selectedCategory
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Top <span className="text-indigo-600">Tech Mentors</span> at Your
            Service
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Connect with industry-leading tech professionals who can guide you
            through your technology career journey. Get personalized mentorship
            in software development, data science, cybersecurity, and more.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                  : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Profile Image */}
              <div className="relative mb-6 h-48 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl overflow-hidden">
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      mentor.name
                    )}&background=random&size=200`;
                  }}
                />
              </div>

              {/* Mentor Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                  {mentor.name}
                </h3>
                <h4 className="text-sm font-semibold text-indigo-600 line-clamp-1">
                  {mentor.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {mentor.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-indigo-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Tech Mentors
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopMentors;
