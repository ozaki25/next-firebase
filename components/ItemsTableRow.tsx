import { MouseEvent, useState } from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  CancelOutlined,
  Check,
  Clear,
  SwapVert,
} from '@material-ui/icons';

import { Item } from '../interfaces';

interface Props {
  item: Item;
}

export default function TableItem({ item }: Props) {
  const [isEditting, setIsEditing] = useState<boolean>(false);

  const onClickSwapStart = (event: MouseEvent<HTMLButtonElement>) => {
    setIsEditing(true);
  };

  const onClickSwapCancel = (event: MouseEvent<HTMLButtonElement>) => {
    setIsEditing(false);
  };

  return (
    <TableRow hover={true}>
      <TableCell>
        <a href={item.url}>{item.title}</a>
      </TableCell>
      {isEditting ? (
        <>
          <TableCell align="center" padding="none">
            <IconButton aria-label="swap up" size="small">
              <ArrowUpward color="secondary" />
            </IconButton>
          </TableCell>
          <TableCell align="center" padding="none">
            <IconButton aria-label="swap down" size="small">
              <ArrowDownward color="secondary" />
            </IconButton>
          </TableCell>
          <TableCell align="center" padding="none">
            <IconButton aria-label="cancel" size="small">
              <CancelOutlined onClick={onClickSwapCancel} />
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
