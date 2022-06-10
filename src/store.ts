import { writable } from 'svelte/store';

export const selectedIdxs = writable<number[]>([]);
