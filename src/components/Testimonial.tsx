"use client";
import React, { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  date: string;
  avatar: string;
  color: string;
  text: string;
  rating: number;
}

const TestimonialsSection = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample testimonial data - replace with your backend data
  const sampleTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Anita Rao",
      date: "29/12/2024",
      avatar: "AR",
      color: "bg-pink-400",
      text: "Shubham's insights were worth 10x the price. Game-changing call!",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya",
      date: "29/12/2024",
      avatar: "PR",
      color: "bg-orange-500",
      text: "Sanket's framework changed everything. Results came in days!",
      rating: 4,
    },
    {
      id: 3,
      name: "Kavya Sharma",
      date: "29/12/2024",
      avatar: "KS",
      color: "bg-green-500",
      text: "Siddharth's strategies helped me land what I wanted in 2 weeks",
      rating: 5,
    },
    {
      id: 4,
      name: "Rishi Tiwari",
      date: "29/12/2024",
      avatar: "RT",
      color: "bg-green-600",
      text: "Followed Nandini's exact steps and saw results in a week",
      rating: 4,
    },
    {
      id: 5,
      name: "Vivek Mohan",
      date: "29/12/2024",
      avatar: "VM",
      color: "bg-green-400",
      text: "One session with Mira saved me from months of trial and error",
      rating: 5,
    },
    {
      id: 6,
      name: "Arjun Menon",
      date: "29/12/2024",
      avatar: "AM",
      color: "bg-purple-400",
      text: "One call with Shivam and I knew exactly what I was doing wrong",
      rating: 4,
    },
    {
      id: 7,
      name: "Pawanpreet",
      date: "29/12/2024",
      avatar: "PW",
      color: "bg-purple-500",
      text: "Used Harshita's approach and finally broke through my plateau",
      rating: 5,
    },
    {
      id: 8,
      name: "Karan Singh",
      date: "29/12/2024",
      avatar: "KS",
      color: "bg-yellow-500",
      text: "Rahul pointed out blindspots that were holding me back for months",
      rating: 4,
    },
    {
      id: 9,
      name: "Sarah Joseph",
      date: "29/12/2024",
      avatar: "SJ",
      color: "bg-red-500",
      text: "Gaurav's session gave me clarity that months of research couldn't",
      rating: 5,
    },
  ];

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : sampleTestimonials;

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === displayTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [displayTestimonials.length]);

  const getVisibleTestimonials = () => {
    const testimonialsToShow = [];
    for (let i = 0; i < 8; i++) {
      const index = (currentIndex + i) % displayTestimonials.length;
      testimonialsToShow.push(displayTestimonials[index]);
    }
    return testimonialsToShow;
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Stats Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">10+</span>
              <span className="text-lg text-gray-700 ml-2">Services</span>
            </div>
            <div className="text-center">
              <span className="text-lg text-gray-700">Trusted by</span>
              <span className="text-2xl font-bold text-gray-900 ml-2">
                100k+
              </span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">10k+</span>
              <span className="text-lg text-gray-700 ml-2">testimonials</span>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            They <span className="text-purple-600">Asked</span>. Then{" "}
            <span className="text-purple-600">Acted</span>.
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Real people, real results - see how others achieved their goals with
            MentorLink. Their stories prove what&apos;s possible when you take action on
            expert advice.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${currentIndex}-${index}`}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              {/* Avatar and Name */}
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed text-sm">
                {testimonial.text}
              </p>

              {/* Rating Stars */}
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } fill-current`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {displayTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-purple-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Start Your Success Story
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;
