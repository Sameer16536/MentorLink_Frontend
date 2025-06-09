import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SuccessStories from "@/components/SuccessStories";
import TestimonialsSection from "@/components/Testimonial";
import TopMentors from "@/components/TopMentors";

export default function Home() {
  return (
    <div >
      <Navbar />
      <HeroSection />
      <SuccessStories />
      <TopMentors />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
