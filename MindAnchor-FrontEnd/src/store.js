// store.js
import { writable } from 'svelte/store';

// Store for managing the current page
export const currentPage = writable('SchedulePage');  // Default to 'page1'
