import React from "react";

interface NavButtonProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavButton: React.FC<NavButtonProps> = ({
  text,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundImage: `url('/images/button.png')`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        height: "60px",
        willChange: "transform", // Optimize for animations
      }}
      className={`
        relative px-6 py-6 font-bold uppercase tracking-wide cursor-pointer
        transform transition-transform duration-200 ease-out
        hover:scale-102 active:scale-98
        ${
          isActive
            ? "text-black scale-105 z-10"
            : "text-red-500 scale-100"
        }
      `}
    >
      <span className="font-display relative z-10">{text}</span>
    </button>
  );
};
