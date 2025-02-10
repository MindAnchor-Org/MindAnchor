import { writable } from 'svelte/store';

// Checks whether the browser environment before accessing localStorage
const savedPage = typeof window !== 'undefined' 
  ? localStorage.getItem('currentPage') || 'ScheduleSummaryPage' 
  : 'ScheduleSummaryPage'; 

// Store for managing the current page
export const currentPage = writable(savedPage);

// Subscribe to changes in currentPage and save to localStorage only in the browser
if (typeof window !== 'undefined') {
  currentPage.subscribe(value => {
    localStorage.setItem('currentPage', value);
  });
}

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
