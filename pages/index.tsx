import Head from 'next/head';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Item } from '../interfaces';

interface HomeProps {
  items: Item[];
}

export default function Home({ items }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container component="main" maxWidth="sm" disableGutters={true}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Flag1</TableCell>
                <TableCell>Flag2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id} hover={true}>
                  <TableCell>
                    <a href={item.url}>{item.title}</a>
                  </TableCell>
                  <TableCell>{item.flag1 ? '✓' : '☓'}</TableCell>
                  <TableCell>{item.flag2 ? '✓' : '☓'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`);
  const items = await res.json();
  return { props: { items } };
}
