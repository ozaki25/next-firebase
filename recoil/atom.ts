import { atom } from 'recoil';
import { Item } from '../interfaces/index';

export const itemsState = atom<Item[]>({
  key: 'itemsState',
  default: [],
});
