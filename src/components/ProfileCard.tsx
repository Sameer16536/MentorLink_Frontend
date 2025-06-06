type ProfileCardProps = {
  name: string;
  role: string;
  company: string;
  color: string;
  achievement: string;
};

const ProfileCard = ({
  name,
  role,
  company,
  color,
  achievement,
}: ProfileCardProps) => (
  <div className="w-[280px] aspect-square p-6 bg-gray-800/40 backdrop-blur-sm rounded-3xl mb-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group hover:scale-105">
    <div className="h-full flex flex-col justify-between">
      {/* Top Section */}
      <div className="space-y-4">
        <div
          className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}
        >
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">{name}</h3>
          <p className="text-gray-400 text-base mt-1">{role}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3">
        <span
          className={`inline-block px-4 py-2 bg-gradient-to-r ${color} text-white rounded-xl font-medium text-sm`}
        >
          {company}
        </span>
        <p className="text-emerald-400 text-sm font-medium">
          {achievement}
        </p>
      </div>
    </div>
    <style jsx global>{`
      @keyframes scroll-up {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-50%);
        }
      }
      @keyframes scroll-down {
        0% {
          transform: translateY(-50%);
        }
        100% {
          transform: translateY(0);
        }
      }
      .animate-scroll-up {
        animation: scroll-up 20s linear infinite;
      }
      .animate-scroll-down {
        animation: scroll-down 20s linear infinite;
      }
    `}</style>
  </div>
);

export default ProfileCard;
