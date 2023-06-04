import { writable } from 'svelte/store';

interface Data {
	/** Joules */
	energy: number;
	/** Km */
	distance: number;
	/** Minutes */
	time: number;
}

export const drivingData = writable<Data>({
	energy: 0,
	distance: 0,
	time: 0,
});

export const walkingData = writable<Data>({
	energy: 0,
	distance: 0,
	time: 0,
});
