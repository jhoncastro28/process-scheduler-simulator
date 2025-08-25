import React from "react";
import { Play, Pause, RotateCcw, Plus, Trash2 } from "lucide-react";

interface ControlPanelProps {
  isRunning: boolean;
  delay: number;
  preemptive: boolean;
  currentTime: number;
  onToggleRunning: () => void;
  onReset: () => void;
  onClearAll: () => void;
  onAddProcess: () => void;
  onAddMultipleProcesses: () => void;
  onDelayChange: (delay: number) => void;
  onPreemptiveChange: (preemptive: boolean) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isRunning,
  delay,
  preemptive,
  currentTime,
  onToggleRunning,
  onReset,
  onClearAll,
  onAddProcess,
  onAddMultipleProcesses,
  onDelayChange,
  onPreemptiveChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Controles principales */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onToggleRunning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            {isRunning ? "Pausar" : "Iniciar"}
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            <Trash2 size={16} />
            Limpiar Todo
          </button>

          <div className="border-l border-gray-300 mx-2"></div>

          <button
            onClick={onAddProcess}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            <Plus size={16} />
            Agregar Proceso
          </button>

          <button
            onClick={onAddMultipleProcesses}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Generar 5 Procesos
          </button>
        </div>

        {/* Configuraciones */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">
              Delay (ms):
            </label>
            <input
              type="range"
              min="100"
              max="3000"
              step="100"
              value={delay}
              onChange={(e) => onDelayChange(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm w-16 text-center">{delay}ms</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="preemptive"
              checked={preemptive}
              onChange={(e) => onPreemptiveChange(e.target.checked)}
              className="rounded"
            />
            <label
              htmlFor="preemptive"
              className="text-sm font-medium whitespace-nowrap"
            >
              SJF con Expropiación (SRTF)
            </label>
          </div>
        </div>
      </div>

      {/* Tiempo actual */}
      <div className="mt-4 text-center">
        <span className="text-lg font-semibold">
          Tiempo Actual: {currentTime}
        </span>
      </div>
    </div>
  );
};
