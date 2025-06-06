"use client";

const HeroSection =  ()=>{
    return(
              <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Connect to Experts in{" "}
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Minutes
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Unlock 1:1 mentorship, resume reviews, and interview prep from top tech professionals. Get personalized guidance for software engineering, product management, data science, and more.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <input
                  type="text"
                  placeholder='Describe your tech goal... (e.g. "System design interview prep for FAANG")'
                  className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                />
                <button className="absolute right-3 top-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
                  →
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {[
                "Get Tech Job Referral",
                "Resume Review (Tech)",
                "Mock Coding Interview",
                "Switch to Tech",
                "LinkedIn for Engineers",
                "Startup Tech Guidance",
                "System Design Prep",
                "Portfolio Review (Dev)",
                "Salary Negotiation (Tech)",
                "Side Project Ideas",
              ].map((tag, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-800/40 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 rounded-full text-gray-300 hover:text-white text-sm font-medium transition-all duration-300 transform hover:scale-105"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}

export default HeroSection;