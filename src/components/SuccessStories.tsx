"use client";
import ActionCard from "./ActionCard";
import AnimatedText from "./AnimatedText";
import ProfileCard from "./ProfileCard";
import ScrollingColumn from "./ScrollingColumn";


const SuccessStories = () => {
  return (
    <div className="px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                <div>Master the</div>
                <div className="h-[80px] flex items-center">
                  <AnimatedText />
                </div>
              </h2>

              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                Connect with industry professionals who&apos;ve been in your shoes.
                Get personalized guidance, insider strategies, and actionable
                advice from those who&apos;ve already achieved your goals.
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md">
                <ActionCard
                  title="Browse Experts"
                  icon="→"
                  className="bg-gradient-to-br from-blue-600 to-purple-600"
                />
                <ActionCard
                  title="Get Mentorship"
                  icon="→"
                  className="bg-gradient-to-br from-green-600 to-emerald-600"
                />
                <ActionCard
                  title="Find Opportunities"
                  icon="→"
                  className="bg-gradient-to-br from-orange-600 to-red-600"
                />
                <ActionCard
                  title="Build Network"
                  icon="→"
                  className="bg-gradient-to-br from-pink-600 to-rose-600"
                />
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500K+</div>
                  <div className="text-sm text-gray-400">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-sm text-gray-400">Active Experts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Animated Cards */}
          <div className="relative h-[600px] overflow-hidden">
            <ScrollingColumn
              direction="up"
              className="absolute left-4 top-0 w-[280px]"
            >
              <ProfileCard
                name="Sarah Chen"
                role="Senior Data Scientist"
                company="Netflix"
                color="from-red-500 to-pink-500"
                achievement="$180K salary jump"
              />
              <ProfileCard
                name="Michael Rodriguez"
                role="Product Manager"
                company="Spotify"
                color="from-green-500 to-emerald-500"
                achievement="Career pivot success"
              />
              <ProfileCard
                name="Priya Sharma"
                role="ML Engineer"
                company="Tesla"
                color="from-blue-500 to-cyan-500"
                achievement="Remote work transition"
              />
              <ProfileCard
                name="David Kim"
                role="Engineering Manager"
                company="Airbnb"
                color="from-purple-500 to-indigo-500"
                achievement="Leadership promotion"
              />
              <ProfileCard
                name="Emma Thompson"
                role="UX Director"
                company="Adobe"
                color="from-orange-500 to-yellow-500"
                achievement="Design career switch"
              />
            </ScrollingColumn>

            <ScrollingColumn
              direction="down"
              className="absolute right-4 top-0 w-[280px]"
            >
              <ProfileCard
                name="Alex Johnson"
                role="Tech Lead"
                company="Microsoft"
                color="from-cyan-500 to-blue-500"
                achievement="Startup to Big Tech"
              />
              <ProfileCard
                name="Lisa Wang"
                role="VP Engineering"
                company="Uber"
                color="from-pink-500 to-red-500"
                achievement="Executive transition"
              />
              <ProfileCard
                name="James Brown"
                role="Solutions Architect"
                company="Amazon"
                color="from-yellow-500 to-orange-500"
                achievement="Cloud expertise growth"
              />
              <ProfileCard
                name="Maria Garcia"
                role="Data Engineer"
                company="Google"
                color="from-emerald-500 to-green-600"
                achievement="International move"
              />
              <ProfileCard
                name="Ryan Davis"
                role="Security Engineer"
                company="Meta"
                color="from-indigo-500 to-purple-500"
                achievement="Cybersecurity mastery"
              />
            </ScrollingColumn>
          </div>
        </div>
      </div>
    </div>
  );
};





export default SuccessStories;