import { DefaultValue, selector } from 'recoil';
import { editState, itemsState, tmpItemsState } from './atom';
import { Item } from '../interfaces';
import {
  startEditSelectorKey,
  endEditSelectorKey,
  swapUpSelectorKey,
  swapDownSelectorKey,
} from './key';

export const startEditSelector = selector({
  key: startEditSelectorKey,
  get: () => {},
  set: ({ set, get }) => {
    const items = get(itemsState);
    set(editState, true);
    set(tmpItemsState, items);
  },
});

export const endEditSelector = selector({
  key: endEditSelectorKey,
  get: () => {},
  set: async ({ set, get, reset }) => {
    const items = get(tmpItemsState);
    const ids = items.map(({ id }) => id);
    try {
      await fetch('/api/items-order', {
        method: 'POST',
        body: JSON.stringify(ids),
      });
      set(itemsState, items);
    } catch (e) {
      console.log(e);
    } finally {
      reset(editState);
      reset(tmpItemsState);
    }
  },
});

export const swapUpSelector = selector<Item>({
  key: swapUpSelectorKey,
  get: () => ({} as Item),
  set: ({ set, get }, item) => {
    if (item instanceof DefaultValue) return;
    const items = get(tmpItemsState);
    const i = items.findIndex(({ id }) => item.id === id);
    if ([-1, 0].includes(i)) return;
    const newItems = [...items];
    [newItems[i], newItems[i - 1]] = [items[i - 1], items[i]];
    set(tmpItemsState, newItems);
  },
});

export const swapDownSelector = selector<Item>({
  key: swapDownSelectorKey,
  get: () => ({} as Item),
  set: ({ set, get }, item) => {
    if (item instanceof DefaultValue) return;
    const items = get(tmpItemsState);
    const i = items.findIndex(({ id }) => item.id === id);
    if ([-1, items.length - 1].includes(i)) return;
    const newItems = [...items];
    [newItems[i], newItems[i + 1]] = [items[i + 1], items[i]];
    set(tmpItemsState, newItems);
  },
});
