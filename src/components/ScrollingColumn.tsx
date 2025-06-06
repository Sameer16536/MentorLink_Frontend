
import React from "react";

interface ScrollingColumnProps {
  children: React.ReactNode;
  direction: "up" | "down";
  className?: string;
}

const ScrollingColumn: React.FC<ScrollingColumnProps> = ({ children, direction, className }) => {
  return (
    <div className={`${className} space-y-4`}>
      <div
        className={`${
          direction === "up" ? "animate-scroll-up" : "animate-scroll-down"
        } space-y-4`}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>
    </div>
  );
};
export default ScrollingColumn;