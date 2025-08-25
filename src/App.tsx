import React from "react";
import { useProcessScheduler } from "./hooks/useProcessScheduler";
import { ControlPanel } from "./components/ControlPanel";
import { ProcessList } from "./components/ProcessList";
import { AlgorithmSimulator } from "./components/AlgorithmSimulator";
import { InfoPanel } from "./components/InfoPanel";

function App() {
  const {
    processes,
    currentTime,
    isRunning,
    delay,
    preemptive,
    fcfsStats,
    sjfStats,
    setIsRunning,
    setDelay,
    setPreemptive,
    addRandomProcess,
    addMultipleProcesses,
    resetSimulation,
    clearAll,
  } = useProcessScheduler();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Simulador de Algoritmos de Planificación de Procesos
          </h1>
          <p className="text-gray-600 text-lg">
            Compara FCFS vs SJF con y sin expropiación en tiempo real
          </p>
        </header>

        {/* Panel de Control */}
        <ControlPanel
          isRunning={isRunning}
          delay={delay}
          preemptive={preemptive}
          currentTime={currentTime}
          onToggleRunning={() => setIsRunning(!isRunning)}
          onReset={resetSimulation}
          onClearAll={clearAll}
          onAddProcess={addRandomProcess}
          onAddMultipleProcesses={() => addMultipleProcesses(5)}
          onDelayChange={setDelay}
          onPreemptiveChange={setPreemptive}
        />

        {/* Lista de Procesos */}
        <ProcessList processes={processes} />

        {/* Simuladores de Algoritmos */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <AlgorithmSimulator
            title="FCFS"
            subtitle="First Come First Served - Primero que llega, primero se atiende"
            stats={fcfsStats}
            color="blue"
          />

          <AlgorithmSimulator
            title="SJF"
            subtitle={
              preemptive
                ? "Shortest Job First - Con Expropiación (SRTF)"
                : "Shortest Job First - Sin Expropiación"
            }
            stats={sjfStats}
            color="green"
          />
        </div>

        {/* Panel de Información */}
        <InfoPanel />
      </div>
    </div>
  );
}

export default App;
