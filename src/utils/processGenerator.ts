import type { Process } from '../types/process';

export const generateRandomProcess = (id: number): Process => {
  const arrivalTime = Math.floor(Math.random() * 20);
  const burstTime = Math.floor(Math.random() * 15) + 1;
  const size = Math.floor(Math.random() * 1000) + 100;
  
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