import React from "react";

export default function TicketStatusCard({ title, percent, color, label }) {
  return (
    <div className="flex flex-col items-center justify-center bg-[#fff3e0] rounded-xl p-4 w-full max-w-[220px] shadow-md">
      <span className="font-bold text-lg text-[#454545] mb-2">{title}</span>
      <div className="relative flex items-center justify-center mb-2">
        <svg width="70" height="70">
          <circle
            cx="35"
            cy="35"
            r="30"
            stroke="#e0e0e0"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="35"
            cy="35"
            r="30"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 30}
            strokeDashoffset={2 * Math.PI * 30 * (1 - percent / 100)}
            strokeLinecap="round"
            transform="rotate(-90 35 35)"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="18"
            fill="#454545"
            fontWeight="bold"
          >
            {percent}%
          </text>
        </svg>
      </div>
      <span className="text-base text-[#454545]">{label}</span>
    </div>
  );
}