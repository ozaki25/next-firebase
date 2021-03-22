import { selector } from 'recoil';
import { editState, itemsState, tmpItemsState } from './atom';
import { Item } from '../interfaces';
import { displayedItemsSelectorKey } from './key';

export const displayedItemsSelector = selector<Item[]>({
  key: displayedItemsSelectorKey,
  get: ({ get }) => {
    const isEditting = get(editState);
    return get(isEditting ? tmpItemsState : itemsState);
  },
});
