import { MouseEvent } from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { Check, Clear, SwapVert } from '@material-ui/icons';

import { Item } from '../interfaces';

interface Props {
  item: Item;
}

export default function TableItem({ item }: Props) {
  const onClickSwap = (event: MouseEvent<HTMLButtonElement>) => {
    alert();
  };
  return (
    <TableRow hover={true}>
      <TableCell>
        <a href={item.url}>{item.title}</a>
      </TableCell>
      <TableCell align="center" padding="none">
        {item.flag1 ? <Check color="primary" /> : <Clear color="action" />}
      </TableCell>
      <TableCell align="center" padding="none">
        {item.flag2 ? <Check color="primary" /> : <Clear color="action" />}
      </TableCell>
      <TableCell align="center" padding="none">
        <IconButton aria-label="swap" size="small" onClick={onClickSwap}>
          <SwapVert />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
