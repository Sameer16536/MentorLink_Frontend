"use client";
import { useEffect, useState } from "react";

const AnimatedText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const texts = [
    { text: "FAANG Interview", color: "from-blue-400 to-cyan-400" },
    { text: "Career Switch", color: "from-green-400 to-emerald-400" },
    { text: "10+ LPA Job", color: "from-yellow-400 to-orange-400" },
    { text: "Remote Work", color: "from-purple-400 to-pink-400" },
    { text: "Startup Journey", color: "from-red-400 to-rose-400" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block min-w-[280px] h-[80px] w-full">
      {texts.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 whitespace-nowrap bg-gradient-to-r ${
            item.color
          } bg-clip-text text-transparent transition-all duration-700 ease-in-out ${
            index === currentIndex
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default AnimatedText;