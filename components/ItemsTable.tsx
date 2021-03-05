import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import ItemsTableRow from './ItemsTableRow';
import { Item } from '../interfaces';

interface Props {
  items: Item[];
}

function ItemsTable({ items: defaultItems }: Props) {
  const [items, setItems] = useState<Item[]>(defaultItems);

  const swapUp = (item: Item) => {
    const i = items.findIndex(({ id }) => item.id === id);
    if ([-1, 0].includes(i)) return;
    const newItems = [...items];
    [newItems[i], newItems[i - 1]] = [items[i - 1], items[i]];
    setItems(newItems);
  };

  const swapDown = (item: Item) => {
    const i = items.findIndex(({ id }) => item.id === id);
    if ([-1, items.length - 1].includes(i)) return;
    const newItems = [...items];
    [newItems[i], newItems[i + 1]] = [items[i + 1], items[i]];
    setItems(newItems);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">2</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <ItemsTableRow
              key={item.id}
              item={item}
              swapUp={swapUp}
              swapDown={swapDown}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ItemsTable;
