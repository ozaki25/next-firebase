import { atom } from 'recoil';
import { Item } from '../interfaces';
import { itemsStateKey, tmpItemsStateKey, editStateKey } from './stateKey';

export const itemsState = atom<Item[]>({
  key: itemsStateKey,
  default: [],
});

export const tmpItemsState = atom<Item[]>({
  key: tmpItemsStateKey,
  default: [],
});

export const editState = atom<boolean>({
  key: editStateKey,
  default: false,
});
