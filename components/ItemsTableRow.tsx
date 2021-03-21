import { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  CheckCircle,
  SwapVert,
} from '@material-ui/icons';

import { Item } from '../interfaces';
import {
  startEditSelector,
  endEditSelector,
  swapUpSelector,
} from '../recoil/selector';
import { editState } from '../recoil/atom';
import { swapDownSelector } from '../recoil/selector';

interface Props {
  index: number;
  item: Item;
}

export default function TableItem({ index, item }: Props) {
  const [editable, setEditable] = useState<boolean>(false);

  const isEditting = useRecoilValue(editState);
  const startEdit = useSetRecoilState(startEditSelector);
  const endEdit = useSetRecoilState(endEditSelector);
  const swapUp = useSetRecoilState(swapUpSelector);
  const swapDown = useSetRecoilState(swapDownSelector);

  const onClickSwapStart = useCallback(() => {
    setEditable(true);
    startEdit();
  }, []);

  const onClickSubmit = useCallback(() => {
    setEditable(false);
    endEdit();
  }, []);

  const onClickSwapUp = useCallback(() => {
    swapUp(item);
  }, [item]);

  const onClickSwapDown = useCallback(() => {
    swapDown(item);
  }, [item]);

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
              onClick={onClickSubmit}
            >
              <CheckCircle color="primary" />
            </IconButton>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell align="right" padding="none" colSpan={3}>
            {isEditting && (
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
}
