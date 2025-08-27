import type { Process } from '../types/process';

type ProcessOverrides = {
  burstTime?: number;
  arrivalTime?: number;
  size?: number;
};

export const generateRandomProcess = (id: number, overrides: ProcessOverrides = {}): Process => {
  const arrivalTime = overrides.arrivalTime ?? Math.floor(Math.random() * 20);
  const burstTime = Math.max(1, Math.floor(overrides.burstTime ?? (Math.random() * 15 + 1)));
  const size = overrides.size ?? (Math.floor(Math.random() * 1000) + 100);
  
  return {
    id,
    name: `P${id}`,
    arrivalTime,
    burstTime,
    originalBurstTime: burstTime,
    remainingTime: burstTime,
    size,
    startTime: -1,
    completionTime: -1,
    waitingTime: 0,
    turnaroundTime: 0,
    isCompleted: false
  };
};

export const generateMultipleProcesses = (count: number, startId: number): Process[] => {
  const processes: Process[] = [];
  
  for (let i = 0; i < count; i++) {
    processes.push(generateRandomProcess(startId + i));
  }
  
  return processes;
};

export const resetProcess = (process: Process): Process => {
  return {
    ...process,
    remainingTime: process.originalBurstTime,
    startTime: -1,
    completionTime: -1,
    waitingTime: 0,
    turnaroundTime: 0,
    isCompleted: false
  };
};