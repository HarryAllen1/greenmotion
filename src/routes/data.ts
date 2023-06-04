import { writable } from 'svelte/store';

interface Data {
	/** metres */
	distance: number;
	/** seconds */
	time: number;
}

export const drivingData = writable<Data>({
	distance: 0,
	time: 0,
});

export const walkingData = writable<Data>({
	distance: 0,
	time: 0,
});
