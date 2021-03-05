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

function ItemsTable({ items }: Props) {
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
            <ItemsTableRow key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ItemsTable;
