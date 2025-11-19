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
      className={`
        relative px-6 py-2 font-bold uppercase tracking-wide transition-all duration-300
        border-2 rounded-full
        ${
          isActive
            ? "bg-yellow-500 text-red-900 border-yellow-600 shadow-[0_0_15px_rgba(234,179,8,0.6)] scale-105"
            : "bg-red-900/80 text-yellow-100 border-yellow-500/50 hover:bg-red-800 hover:border-yellow-400"
        }
      `}
    >
      <span className="font-display">{text}</span>
    </button>
  );
};
