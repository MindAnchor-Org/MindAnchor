// store.js
import { writable } from 'svelte/store';

// Store for managing the current page
export const currentPage = writable('ScheduleSummaryPage');  // Default to 'page1'

type Schedule = {
  id: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  tasks: string[];
};

export const scheduleStore = writable<Schedule | null>(null);

export const scheduleIdCounter = writable(0);
