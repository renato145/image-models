import { writable } from 'svelte/store';

export const selectedIdxs = writable<number[]>([]);

export const selectedFamilies = writable<string[]>([
  'vit',
  'convnext',
  'resnet',
  'levit',
  'regnetx',
  'swin'
]);
