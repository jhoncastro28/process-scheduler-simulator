import type { Process, SchedulerState } from '../types/process';

export const simulateFCFS = (processes: Process[], currentTime: number): SchedulerState => {
  // Obtener procesos que ya han llegado y no están completados
  const availableProcesses = processes.filter(p => 
    p.arrivalTime <= currentTime && !p.isCompleted
  );
  
  // Ordenar por tiempo de llegada (FCFS)
  const readyQueue = [...availableProcesses].sort((a, b) => 
    a.arrivalTime - b.arrivalTime || a.id - b.id
  );

  let current: Process | null = null;
  const completed = processes.filter(p => p.isCompleted);
  let remaining = 0;

  if (readyQueue.length > 0) {
    current = readyQueue[0];
    
    // Si es la primera vez que ejecuta el proceso
    if (current.startTime === -1) {
      current.startTime = currentTime;
    }
    
    // Ejecutar por una unidad de tiempo
    current.remainingTime--;
    remaining = current.remainingTime;
    
    // Si el proceso se completa
    if (current.remainingTime <= 0) {
      current.isCompleted = true;
      current.completionTime = currentTime + 1;
      current.turnaroundTime = current.completionTime - current.arrivalTime;
      current.waitingTime = current.turnaroundTime - current.originalBurstTime;
    }
  }

  return {
    completed,
    current,
    queue: readyQueue.slice(1), // Cola sin el proceso actual
    remaining
  };
};