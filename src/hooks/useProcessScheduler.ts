import { useState, useEffect, useRef, useCallback } from 'react';
import type { Process } from '../types/process';
import type { SchedulerState } from '../types/process';
import { generateRandomProcess, generateMultipleProcesses, resetProcess } from '../utils/processGenerator';
import { simulateFCFS } from '../utils/fcfsAlgorithm';
import { simulateSJF } from '../utils/sjfAlgorithm';

export const useProcessScheduler = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(1000);
  const [preemptive, setPreemptive] = useState(true);
  const [processCounter, setProcessCounter] = useState(1);
  const [fcfsStats, setFcfsStats] = useState<SchedulerState>({ 
    completed: [], 
    current: null, 
    queue: [],
    remaining: 0 
  });
  const [sjfStats, setSjfStats] = useState<SchedulerState>({ 
    completed: [], 
    current: null, 
    queue: [],
    remaining: 0 
  });

  const intervalRef = useRef<number | null>(null);

  // Agregar proceso aleatorio
  const addRandomProcess = useCallback(() => {
    const newProcess = generateRandomProcess(processCounter);
    setProcesses(prev => [...prev, newProcess]);
    setProcessCounter(prev => prev + 1);
  }, [processCounter]);

  // Generar múltiples procesos aleatorios
  const addMultipleProcesses = useCallback((count: number = 5) => {
    const newProcesses = generateMultipleProcesses(count, processCounter);
    setProcesses(prev => [...prev, ...newProcesses]);
    setProcessCounter(prev => prev + count);
  }, [processCounter]);

  // Ejecutar simulación
  const runSimulation = useCallback(() => {
    setProcesses(currentProcesses => {
      // Crear copias independientes para cada algoritmo
      const fcfsProcesses = currentProcesses.map(p => ({ ...p }));
      const sjfProcesses = currentProcesses.map(p => ({ ...p }));

      // Ejecutar algoritmos
      const fcfsResult = simulateFCFS(fcfsProcesses, currentTime);
      const sjfResult = simulateSJF(sjfProcesses, currentTime, preemptive);

      // Actualizar estadísticas
      setFcfsStats(fcfsResult);
      setSjfStats(sjfResult);

      // Actualizar procesos con los nuevos estados
      return currentProcesses.map(p => {
        const fcfsProcess = fcfsProcesses.find(fp => fp.id === p.id);
        const sjfProcess = sjfProcesses.find(sp => sp.id === p.id);
        
        // Retornar el proceso original con los estados actualizados de ambos algoritmos
        return {
          ...p,
          // Para visualización, usar el estado del algoritmo que esté más avanzado
          remainingTime: Math.min(fcfsProcess?.remainingTime ?? p.remainingTime, sjfProcess?.remainingTime ?? p.remainingTime),
          startTime: Math.max(fcfsProcess?.startTime ?? -1, sjfProcess?.startTime ?? -1, p.startTime),
          completionTime: Math.max(fcfsProcess?.completionTime ?? -1, sjfProcess?.completionTime ?? -1, p.completionTime),
          isCompleted: (fcfsProcess?.isCompleted || sjfProcess?.isCompleted) ?? p.isCompleted
        };
      });
    });

    setCurrentTime(prev => prev + 1);
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
    setProcesses(prev => prev.map(resetProcess));
    setFcfsStats({ completed: [], current: null, queue: [], remaining: 0 });
    setSjfStats({ completed: [], current: null, queue: [], remaining: 0 });
  }, []);

  // Limpiar todo
  const clearAll = useCallback(() => {
    resetSimulation();
    setProcesses([]);
    setProcessCounter(1);
  }, [resetSimulation]);

  return {
    // Estado
    processes,
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
    clearAll
  };
};