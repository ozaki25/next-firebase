import { atom } from 'recoil';
import { Item } from '../interfaces/index';

export const actionNames = {
  itemsState: 'itemsState',
};

export const itemsState = atom<Item[]>({
  key: actionNames.itemsState,
  default: [],
});
