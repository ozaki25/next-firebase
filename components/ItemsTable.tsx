import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
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
import { editState, itemsState, tmpItemsState } from '../recoil/atom';

interface Props {
  items: Item[];
}

function ItemsTable({ items: defaultItems }: Props) {
  const [items, setItems] = useRecoilState(itemsState);
  const [tmpItems, setTmpItems] = useRecoilState(tmpItemsState);
  const [isEditting, setIsEditing] = useRecoilState(editState);
  const startEdit = useSetRecoilState(editState);

  const endEdit = async () => {
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
      setIsEditing(false);
      setTmpItems([]);
    }
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

  useEffect(() => {
    setItems(defaultItems);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell padding="none">Title</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(isEditting ? tmpItems : items).map((item, i) => (
            <ItemsTableRow
              key={item.id}
              index={i + 1}
              item={item}
              editable={!isEditting}
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
