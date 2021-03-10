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
  const [tmpItems, setTmpItems] = useState<Item[]>([]);
  const [isEditting, setIsEditing] = useState<boolean>(false);

  const startEdit = () => {
    setIsEditing(true);
    setTmpItems(items);
  };

  const endEdit = () => {
    setIsEditing(false);
    setItems(tmpItems);
    setTmpItems([]);
  };

  const swapUp = (item: Item) => {
    const i = tmpItems.findIndex(({ id }) => item.id === id);
    if ([-1, 0].includes(i)) return;
    const newItems = [...tmpItems];
    [newItems[i], newItems[i - 1]] = [tmpItems[i - 1], tmpItems[i]];
    setTmpItems(newItems);
  };

  const swapDown = (item: Item) => {
    const i = tmpItems.findIndex(({ id }) => item.id === id);
    if ([-1, tmpItems.length - 1].includes(i)) return;
    const newItems = [...tmpItems];
    [newItems[i], newItems[i + 1]] = [tmpItems[i + 1], tmpItems[i]];
    setTmpItems(newItems);
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
          {(isEditting ? tmpItems : items).map(item => (
            <ItemsTableRow
              key={item.id}
              item={item}
              startEdit={startEdit}
              endEdit={endEdit}
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
