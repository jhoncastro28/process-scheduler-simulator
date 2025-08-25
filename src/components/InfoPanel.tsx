import React from "react";
import { Info, Clock, Zap, Users } from "lucide-react";

export const InfoPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="text-blue-500" size={20} />
        <h2 className="text-xl font-semibold">Información del Simulador</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Abreviaciones */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Clock size={16} className="text-green-500" />
            Abreviaciones de Tiempo
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">AT:</span>
              <span>Arrival Time (Tiempo de llegada)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">BT:</span>
              <span>Burst Time (Tiempo de ráfaga original)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">RT:</span>
              <span>Remaining Time (Tiempo restante)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">WT:</span>
              <span>Waiting Time (Tiempo de espera)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">TAT:</span>
              <span>Turnaround Time (Tiempo de retorno)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Size:</span>
              <span>Tamaño del proceso en KB</span>
            </div>
          </div>
        </div>

        {/* Algoritmos */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Zap size={16} className="text-purple-500" />
            Algoritmos Implementados
          </h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-800">
                FCFS (First Come First Served)
              </div>
              <div className="text-blue-600">
                Primero que llega, primero se atiende. Sin expropiación.
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800">
                SJF (Shortest Job First)
              </div>
              <div className="text-green-600">
                Trabajos más cortos primeros.
              </div>
              <div className="text-xs text-green-500 mt-1">
                • Sin expropiación: Una vez iniciado, el proceso termina
                <br />• Con expropiación (SRTF): Puede ser interrumpido por
                procesos más cortos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estados de Proceso */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Users size={16} className="text-orange-500" />
          Estados de los Procesos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-gray-200 border-2 border-gray-400 rounded"></div>
            <div>
              <div className="font-medium">En Espera</div>
              <div className="text-gray-600">Proceso listo para ejecutarse</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-6 h-6 bg-blue-200 border-2 border-blue-400 rounded animate-pulse"></div>
            <div>
              <div className="font-medium text-blue-800">Ejecutándose</div>
              <div className="text-blue-600">Proceso actualmente en CPU</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-6 h-6 bg-green-200 border-2 border-green-400 rounded"></div>
            <div>
              <div className="font-medium text-green-800">Completado</div>
              <div className="text-green-600">
                Proceso terminado exitosamente
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consejos de Uso */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">
          💡 Consejos de Uso
        </h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Genera algunos procesos antes de iniciar la simulación</li>
          <li>
            • Usa el control de delay para observar mejor el comportamiento
          </li>
          <li>
            • Compara los resultados entre FCFS y SJF con/sin expropiación
          </li>
          <li>
            • Los procesos se generan con tiempos de llegada y ráfaga aleatorios
          </li>
          <li>
            • Observa cómo la expropiación afecta el orden de ejecución en SJF
          </li>
        </ul>
      </div>
    </div>
  );
};
