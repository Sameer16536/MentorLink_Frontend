import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SuccessStories from "@/components/SuccessStories";
import TestimonialsSection from "@/components/Testimonial";
import TopMentors from "@/components/TopMentors";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />
      {/* Sample content sections */}
      {/* <div className="px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-800/20 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                Feature Section {i}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Experience seamless interactions with our enhanced navbar
                design. Notice how the background adapts as you scroll, creating
                a dynamic and engaging user experience that matches modern web
                standards and exceeds user expectations.
              </p>
            </div>
          ))}
        </div>
      </div> */}
      <SuccessStories />
      <TopMentors />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
