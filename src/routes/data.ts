import { writable } from 'svelte/store';

interface Data {
	/** metres */
	distance: number;
	/** seconds */
	time: number;
}

interface PedestrianData extends Data {
	weight: number;
}

interface Car {
	model: string;
	year: number;
	make: string;
}

export const drivingData = writable<Data>({
	distance: 0,
	time: 0,
});

export const walkingData = writable<PedestrianData>({
	distance: 0,
	time: 0,
	weight: 2,
});

export const bikingData = writable<PedestrianData>({
	distance: 0,
	time: 0,
	weight: 2,
});

export const carData = writable<Car>({
	model: 'Accord',
	year: 2012,
	make: 'Honda',
});
