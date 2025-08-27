import type { Process, SchedulerState } from "../types/process";

export const simulateSJF = (
  processes: Process[],
  currentTime: number,
  isPreemptive: boolean
): SchedulerState => {
  // Obtener procesos que ya han llegado y no están completados
  const availableProcesses = processes.filter(
    (p) => p.arrivalTime <= currentTime && !p.isCompleted
  );

  let readyQueue: Process[];
  let current: Process | null = null;
  // Ordenar completados por completionTime ascendente
  const completed = processes
    .filter((p) => p.isCompleted)
    .sort((a, b) => a.completionTime - b.completionTime);
  let remaining = 0;

  if (isPreemptive) {
    // SRTF - Shortest Remaining Time First (con expropiación)
    readyQueue = [...availableProcesses].sort(
      (a, b) =>
        a.remainingTime - b.remainingTime ||
        a.arrivalTime - b.arrivalTime ||
        a.id - b.id
    );

    if (readyQueue.length > 0) {
      current = readyQueue[0];
      readyQueue = readyQueue.slice(1);
    }
  } else {
    // SJF sin expropiación
    const runningProcess = availableProcesses.find(
      (p) => p.startTime !== -1 && !p.isCompleted
    );

    if (runningProcess) {
      // Si hay un proceso ejecutándose, continuar con él
      current = runningProcess;
      readyQueue = availableProcesses
        .filter((p) => p.id !== current!.id)
        .sort(
          (a, b) =>
            a.originalBurstTime - b.originalBurstTime ||
            a.arrivalTime - b.arrivalTime ||
            a.id - b.id
        );
    } else {
      // Si no hay proceso ejecutándose, elegir el de menor tiempo de ráfaga
      readyQueue = [...availableProcesses].sort(
        (a, b) =>
          a.originalBurstTime - b.originalBurstTime ||
          a.arrivalTime - b.arrivalTime ||
          a.id - b.id
      );

      if (readyQueue.length > 0) {
        current = readyQueue[0];
        readyQueue = readyQueue.slice(1);
      }
    }
  }

  if (current) {
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
    queue: readyQueue,
    remaining,
  };
};
