import { writable, get } from 'svelte/store';
import { randomPerson } from '$lib/colors';

// People
const person = randomPerson('Jane');
const storedPeople = window.localStorage.getItem('people') || '[]';
const initialPeople = storedPeople != '[]' ? JSON.parse(storedPeople) : [person];

export const people = writable(initialPeople);

people.subscribe((value) => {
	window.localStorage.setItem('people', JSON.stringify(value));
});

// Duration
const storedDuration = window.localStorage.getItem('duration');
const initialDuration = storedDuration ? parseInt(storedDuration) : 10;
export const duration = writable(initialDuration);

duration.subscribe((value) => {
	window.localStorage.setItem('duration', String(value));
});

// Index
const storedIndex = window.localStorage.getItem('index');
const initialIndex = storedIndex ? parseInt(storedIndex) : 0;
export const currentIndex = writable(initialIndex);

currentIndex.subscribe((value) => {
	window.localStorage.setItem('index', String(value));
});

export function incrementIndex() {
	const n = get(people).length;
	currentIndex.update((i) => (i + 1) % n);
}

// Timer State
export const timerState = writable('stopped');
