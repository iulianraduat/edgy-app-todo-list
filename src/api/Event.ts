export const NEEDS_ACTION = 'NEEDS-ACTION';
export const COMPLETED = 'COMPLETED';

export interface Event {
  summary: string;
  description: string;
  percentComplete: number;
  status: 'NEEDS-ACTION' | 'COMPLETED';
  completed?: string;
}
