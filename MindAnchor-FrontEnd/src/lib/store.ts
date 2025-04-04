import { writable } from 'svelte/store';

// Check if the user is using the extension for the first time
const isFirstTime = typeof window !== 'undefined' && !localStorage.getItem('hasUsedExtension');

// Determine the initial page based on first-time usage
const savedPage = typeof window !== 'undefined'
  ? (isFirstTime ? 'WelcomePage' : localStorage.getItem('currentPage') || 'BlackList_WhiteListPage')
  : 'BlackList_WhiteListPage';

// Store for managing the current page
export const currentPage = writable(savedPage);

export const isBionified = writable(false);

// Subscribe to changes in currentPage and save to localStorage only in the browser
if (typeof window !== 'undefined') {
  currentPage.subscribe(value => {
    localStorage.setItem('currentPage', value);

    // If the user navigates away from the WelcomePage or T_and_C_Page, mark the extension as used
    if (value !== 'WelcomePage') {
      localStorage.setItem('hasUsedExtension', 'true');
    }
  });
}

// export type Schedule = {
//   id: number;
//   name : string
//   // startDate: string;
//   // endDate: string;
//   // startTime: string;
//   // endTime: string;
// };

// export const scheduleStore1 = writable<Schedule | null>(null);


// export const scheduleStore = writable<Schedule | null>(null);

const getStoredCounter = () => {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem('scheduleIdCounter');
    return storedValue ? parseInt(storedValue, 10) : 0;
  }
  return 0;
};

// export const scheduleIdCounter = writable(getStoredCounter());

// Persist changes to localStorage only in the browser
// if (typeof window !== 'undefined') {
//   scheduleIdCounter.subscribe((value) => {
//     localStorage.setItem('scheduleIdCounter', value.toString());
//   });
// }

// export const currentScheduleId = writable<number | null>(null);

// Persist the current schedule ID to localStorage
// if (typeof window !== 'undefined') {
//   currentScheduleId.subscribe((value) => {
//     if (value !== null) {
//       localStorage.setItem('currentScheduleId', value.toString());
//     } 
//   });
// }
