export interface Process {
  id: number;
  name: string;
  arrivalTime: number;
  burstTime: number;
  originalBurstTime: number;
  remainingTime: number;
  size: number;
  startTime: number;
  completionTime: number;
  waitingTime: number;
  turnaroundTime: number;
  isCompleted: boolean;
}

export interface SchedulerState {
  completed: Process[];
  current: Process | null;
  queue: Process[];
  remaining: number;
}

export interface SchedulerStats {
  totalProcesses: number;
  completedProcesses: number;
  averageWaitingTime: number;
  averageTurnaroundTime: number;
}