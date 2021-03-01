import Head from 'next/head';
import {
  Container,
  createStyles,
  Fab,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from '@material-ui/core';
import { Add, Check, Clear } from '@material-ui/icons';
import { Item } from '../interfaces';

interface HomeProps {
  items: Item[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

export default function Home({ items }: HomeProps) {
  const classes = useStyles();
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
                  <TableCell>
                    {item.flag1 ? (
                      <Check color="primary" fontSize="large" />
                    ) : (
                      <Clear color="action" fontSize="large" />
                    )}
                  </TableCell>
                  <TableCell>
                    {item.flag2 ? (
                      <Check color="primary" fontSize="large" />
                    ) : (
                      <Clear color="action" fontSize="large" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Fab color="primary" aria-label="add" className={classes.fab}>
          <Add />
        </Fab>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`);
  const items = await res.json();
  return { props: { items } };
}
