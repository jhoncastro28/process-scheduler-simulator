import { useState, useEffect, useRef, useCallback } from "react";
import type { Process } from "../types/process";
import type { SchedulerState } from "../types/process";
import {
  generateRandomProcess,
  generateMultipleProcesses,
  resetProcess,
} from "../utils/processGenerator";
import { simulateFCFS } from "../utils/fcfsAlgorithm";
import { simulateSJF } from "../utils/sjfAlgorithm";

export const useProcessScheduler = () => {
  const [originalProcesses, setOriginalProcesses] = useState<Process[]>([]);
  const [fcfsProcesses, setFcfsProcesses] = useState<Process[]>([]);
  const [sjfProcesses, setSjfProcesses] = useState<Process[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(1000);
  const [preemptive, setPreemptive] = useState(true);
  const [processCounter, setProcessCounter] = useState(1);
  const [fcfsStats, setFcfsStats] = useState<SchedulerState>({
    completed: [],
    current: null,
    queue: [],
    remaining: 0,
  });
  const [sjfStats, setSjfStats] = useState<SchedulerState>({
    completed: [],
    current: null,
    queue: [],
    remaining: 0,
  });

  const intervalRef = useRef<number | null>(null);

  // Agregar proceso aleatorio
  const addRandomProcess = useCallback(() => {
    const newProcess = generateRandomProcess(processCounter);
    setOriginalProcesses((prev) => [...prev, newProcess]);
    setFcfsProcesses((prev) => [...prev, { ...newProcess }]);
    setSjfProcesses((prev) => [...prev, { ...newProcess }]);
    setProcessCounter((prev) => prev + 1);
  }, [processCounter]);

  // Generar múltiples procesos aleatorios
  const addMultipleProcesses = useCallback(
    (count: number = 5) => {
      const newProcesses = generateMultipleProcesses(count, processCounter);
      setOriginalProcesses((prev) => [...prev, ...newProcesses]);
      setFcfsProcesses((prev) => [
        ...prev,
        ...newProcesses.map((p) => ({ ...p })),
      ]);
      setSjfProcesses((prev) => [
        ...prev,
        ...newProcesses.map((p) => ({ ...p })),
      ]);
      setProcessCounter((prev) => prev + count);
    },
    [processCounter]
  );

  // Ejecutar simulación
  const runSimulation = useCallback(() => {
    setFcfsProcesses((prev) => {
      const procs = prev.map((p) => ({ ...p }));
      const stats = simulateFCFS(procs, currentTime);
      setFcfsStats(stats);
      return procs;
    });
    setSjfProcesses((prev) => {
      const procs = prev.map((p) => ({ ...p }));
      const stats = simulateSJF(procs, currentTime, preemptive);
      setSjfStats(stats);
      return procs;
    });
    setCurrentTime((prev) => prev + 1);
  }, [currentTime, preemptive]);

  // Control de la simulación
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(runSimulation, delay);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, delay, runSimulation]);

  // Reiniciar simulación
  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setCurrentTime(0);
    setFcfsProcesses(originalProcesses.map(resetProcess));
    setSjfProcesses(originalProcesses.map(resetProcess));
    setFcfsStats({ completed: [], current: null, queue: [], remaining: 0 });
    setSjfStats({ completed: [], current: null, queue: [], remaining: 0 });
  }, [originalProcesses]);

  // Limpiar todo
  const clearAll = useCallback(() => {
    resetSimulation();
    setOriginalProcesses([]);
    setFcfsProcesses([]);
    setSjfProcesses([]);
    setProcessCounter(1);
  }, [resetSimulation]);

  return {
    // Estado
    processes: originalProcesses,
    currentTime,
    isRunning,
    delay,
    preemptive,
    fcfsStats,
    sjfStats,

    // Acciones
    setIsRunning,
    setDelay,
    setPreemptive,
    addRandomProcess,
    addMultipleProcesses,
    resetSimulation,
    clearAll,
  };
};
