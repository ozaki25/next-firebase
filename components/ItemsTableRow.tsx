import { memo, useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  CheckCircle,
  SwapVert,
} from '@material-ui/icons';

import { Item } from '../interfaces';
import { editState, itemsState, tmpItemsState } from '../recoil/atom';

interface Props {
  index: number;
  item: Item;
}

export default memo(function TableItem({ index, item }: Props) {
  const [editable, setEditable] = useState<boolean>(false);
  const [isEditting, setIsEditing] = useRecoilState(editState);
  const [items, setItems] = useRecoilState(itemsState);
  const [tmpItems, setTmpItems] = useRecoilState(tmpItemsState);

  const onClickSwapStart = useCallback(() => {
    setEditable(true);
    setIsEditing(true);
    setTmpItems(items);
  }, [items]);

  const onClickSwapEnd = useCallback(async () => {
    const ids = tmpItems.map(({ id }) => id);
    try {
      await fetch('/api/items-order', {
        method: 'POST',
        body: JSON.stringify(ids),
      });
      setItems(tmpItems);
    } catch (e) {
      console.log(e);
    } finally {
      setEditable(false);
      setIsEditing(false);
      setTmpItems([]);
    }
  }, [tmpItems]);

  const onClickSwapUp = useCallback(() => {
    const i = tmpItems.findIndex(({ id }) => item.id === id);
    if ([-1, 0].includes(i)) return;
    const newItems = [...tmpItems];
    [newItems[i], newItems[i - 1]] = [tmpItems[i - 1], tmpItems[i]];
    setTmpItems(newItems);
  }, [tmpItems]);

  const onClickSwapDown = useCallback(() => {
    const i = tmpItems.findIndex(({ id }) => item.id === id);
    if ([-1, tmpItems.length - 1].includes(i)) return;
    const newItems = [...tmpItems];
    [newItems[i], newItems[i + 1]] = [tmpItems[i + 1], tmpItems[i]];
    setTmpItems(newItems);
  }, [tmpItems]);

  return (
    <TableRow hover={true} selected={editable}>
      <TableCell>{index}</TableCell>
      <TableCell padding="none">
        <a href={item.url}>{item.title}</a>
      </TableCell>
      {editable ? (
        <>
          <TableCell align="center" padding="none">
            <IconButton
              aria-label="swap up"
              size="small"
              onClick={onClickSwapUp}
            >
              <ArrowUpward color="secondary" />
            </IconButton>
          </TableCell>
          <TableCell align="center" padding="none">
            <IconButton
              aria-label="swap down"
              size="small"
              onClick={onClickSwapDown}
            >
              <ArrowDownward color="secondary" />
            </IconButton>
          </TableCell>
          <TableCell align="center" padding="none">
            <IconButton
              aria-label="submit"
              size="small"
              onClick={onClickSwapEnd}
            >
              <CheckCircle color="primary" />
            </IconButton>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell align="right" padding="none" colSpan={3}>
            {!isEditting && (
              <IconButton
                aria-label="swap"
                size="small"
                onClick={onClickSwapStart}
              >
                <SwapVert />
              </IconButton>
            )}
          </TableCell>
        </>
      )}
    </TableRow>
  );
});
