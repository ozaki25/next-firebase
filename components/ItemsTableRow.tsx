import { MouseEvent, useState } from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  Check,
  CheckCircle,
  Clear,
  SwapVert,
} from '@material-ui/icons';

import { Item } from '../interfaces';

interface Props {
  item: Item;
  swapUp: (item: Item) => void;
  swapDown: (item: Item) => void;
}

export default function TableItem({ item, swapUp, swapDown }: Props) {
  const [isEditting, setIsEditing] = useState<boolean>(false);

  const onClickSwapStart = (event: MouseEvent<HTMLButtonElement>) => {
    setIsEditing(true);
  };

  const onClickSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    setIsEditing(false);
  };

  const onClickSwapUp = (event: MouseEvent<HTMLButtonElement>) => {
    swapUp(item);
  };

  const onClickSwapDown = (event: MouseEvent<HTMLButtonElement>) => {
    swapDown(item);
  };

  return (
    <TableRow hover={true} selected={isEditting}>
      <TableCell>
        <a href={item.url}>{item.title}</a>
      </TableCell>
      {isEditting ? (
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
          <TableCell align="center" padding="none">
            {item.flag1 ? <Check color="primary" /> : <Clear color="action" />}
          </TableCell>
          <TableCell align="center" padding="none">
            {item.flag2 ? <Check color="primary" /> : <Clear color="action" />}
          </TableCell>
          <TableCell align="center" padding="none">
            <IconButton
              aria-label="swap"
              size="small"
              onClick={onClickSwapStart}
            >
              <SwapVert />
            </IconButton>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
