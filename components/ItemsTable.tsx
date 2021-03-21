import { useRecoilValue } from 'recoil';
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
import { displayedItemsSelector } from '../recoil/selector';

function ItemsTable() {
  const items = useRecoilValue(displayedItemsSelector);

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
          {items.map((item, i) => (
            <ItemsTableRow key={item.id} index={i + 1} item={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ItemsTable;
