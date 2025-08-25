import React from "react";
import type { SchedulerState } from "../types/process";
import { ProcessCard } from "./ProcessCard";

interface AlgorithmSimulatorProps {
  title: string;
  subtitle: string;
  stats: SchedulerState;
  color: "blue" | "green";
}

export const AlgorithmSimulator: React.FC<AlgorithmSimulatorProps> = ({
  title,
  subtitle,
  stats,
  color,
}) => {
  const colorClasses = {
    blue: {
      title: "text-blue-600",
      border: "border-blue-300",
      background: "bg-blue-50",
    },
    green: {
      title: "text-green-600",
      border: "border-green-300",
      background: "bg-green-50",
    },
  };

  const colors = colorClasses[color];

  const calculateStats = () => {
    if (stats.completed.length === 0) {
      return { avgWaitingTime: 0, avgTurnaroundTime: 0 };
    }

    const totalWaitingTime = stats.completed.reduce(
      (sum, p) => sum + p.waitingTime,
      0
    );
    const totalTurnaroundTime = stats.completed.reduce(
      (sum, p) => sum + p.turnaroundTime,
      0
    );

    return {
      avgWaitingTime: (totalWaitingTime / stats.completed.length).toFixed(2),
      avgTurnaroundTime: (totalTurnaroundTime / stats.completed.length).toFixed(
        2
      ),
    };
  };

  const { avgWaitingTime, avgTurnaroundTime } = calculateStats();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h2 className={`text-xl font-semibold mb-1 ${colors.title}`}>
          {title}
        </h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      {/* Proceso Actual */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <span>Proceso Ejecutándose:</span>
          {stats.current && (
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Tiempo restante: {stats.remaining}
            </span>
          )}
        </h3>
        <div
          className={`min-h-24 border-2 border-dashed ${colors.border} rounded-lg p-3 flex items-center justify-center ${colors.background}`}
        >
          {stats.current ? (
            <ProcessCard process={stats.current} type="current" />
          ) : (
            <span className="text-gray-400">Sin proceso ejecutándose</span>
          )}
        </div>
      </div>

      {/* Cola de Listos */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">
          Cola de Listos ({stats.queue.length}):
        </h3>
        <div className="min-h-20 border-2 border-dashed border-gray-300 rounded-lg p-3">
          {stats.queue.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {stats.queue.map((process) => (
                <ProcessCard
                  key={`${color}-queue-${process.id}`}
                  process={process}
                  type="waiting"
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-2">Cola vacía</div>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center">
          <div className="font-semibold text-lg">{stats.completed.length}</div>
          <div className="text-gray-600">Completados</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg">{stats.queue.length}</div>
          <div className="text-gray-600">En Cola</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg">{avgWaitingTime}</div>
          <div className="text-gray-600">Tiempo Esp. Prom.</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg">{avgTurnaroundTime}</div>
          <div className="text-gray-600">TAT Promedio</div>
        </div>
      </div>

      {/* Procesos Completados */}
      <div>
        <h3 className="font-medium mb-3">
          Procesos Completados ({stats.completed.length}):
        </h3>
        <div className="max-h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50">
          {stats.completed.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {stats.completed.map((process) => (
                <ProcessCard
                  key={`${color}-completed-${process.id}`}
                  process={process}
                  type="completed"
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-2">
              Ningún proceso completado
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
