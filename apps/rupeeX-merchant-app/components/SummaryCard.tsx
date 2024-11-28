import React from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  bgColor: string;
}

export const SummaryCard = ({ title, value, icon, bgColor }: SummaryCardProps) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg ${bgColor} text-white`}>
      <div className="flex items-center">
        <div className="mr-4">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};
