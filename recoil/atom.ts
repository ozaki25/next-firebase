import { atom } from 'recoil';
import { Item } from '../interfaces';
import { itemsStateKey, tmpItemsStateKey, editStateKey } from './key';

let initItems: Item[] = [];

export const setInitItems = (items: Item[]) => {
  initItems = items;
};

export const itemsState = atom<Item[]>({
  key: itemsStateKey,
  default: [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      setSelf(initItems);
    },
  ],
});

export const tmpItemsState = atom<Item[]>({
  key: tmpItemsStateKey,
  default: [],
});

export const editState = atom<boolean>({
  key: editStateKey,
  default: true,
});
