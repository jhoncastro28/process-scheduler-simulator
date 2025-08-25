import React from "react";
import type { Process } from "../types/process";
import { ProcessCard } from "./ProcessCard";

interface ProcessListProps {
  processes: Process[];
}

export const ProcessList: React.FC<ProcessListProps> = ({ processes }) => {
  if (processes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Lista de Procesos</h2>
        <div className="text-center text-gray-500 py-8">
          No hay procesos generados. Haz clic en "Agregar Proceso" o "Generar 5
          Procesos" para comenzar.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Lista de Procesos ({processes.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
        {processes.map((process) => (
          <ProcessCard key={process.id} process={process} type="waiting" />
        ))}
      </div>
    </div>
  );
};
