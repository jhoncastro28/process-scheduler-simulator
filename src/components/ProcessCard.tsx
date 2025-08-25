import React from "react";
import type { Process } from "../types/process";

interface ProcessCardProps {
  process: Process;
  type: "waiting" | "current" | "completed";
}

export const ProcessCard: React.FC<ProcessCardProps> = ({ process, type }) => {
  const getCardStyles = () => {
    switch (type) {
      case "completed":
        return "bg-green-100 border-green-300 text-green-800";
      case "current":
        return "bg-blue-100 border-blue-300 text-blue-800 animate-pulse ring-2 ring-blue-400";
      default:
        return "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200";
    }
  };

  return (
    <div
      className={`p-3 rounded-lg border-2 min-w-24 text-center transition-all duration-300 ${getCardStyles()}`}
    >
      <div className="font-bold text-sm mb-1">{process.name}</div>
      <div className="text-xs space-y-0.5">
        <div>AT: {process.arrivalTime}</div>
        <div>BT: {process.originalBurstTime}</div>
        <div>RT: {process.remainingTime}</div>
        <div>Size: {process.size}KB</div>
        {type === "completed" && (
          <>
            <div className="border-t pt-1 mt-1">
              <div>WT: {process.waitingTime}</div>
              <div>TAT: {process.turnaroundTime}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
