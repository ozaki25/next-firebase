import { selector } from 'recoil';
import { editState, tmpItemsState } from './atom';
import { Item } from '../interfaces';
import { startEditSelectorKey } from './stateKey';

export const startEdit = selector<Item[]>({
  key: startEditSelectorKey,
  get: () => [],
  set: ({ set }, items) => {
    set(editState, true);
    set(tmpItemsState, items);
  },
});
