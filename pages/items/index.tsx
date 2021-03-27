import { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Container,
  createStyles,
  Fab,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import ItemsTable from '../../components/ItemsTable';
import { Item } from '../../interfaces';
import { setInitItems } from '../../recoil/atom';

interface Props {
  items: Item[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      'margin-bottom': theme.spacing(12),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

export default function Home({ items }: Props) {
  const classes = useStyles();

  useMemo(() => {
    setInitItems(items);
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container
        component="main"
        maxWidth="sm"
        disableGutters={true}
        className={classes.container}
      >
        <ItemsTable />
        <Link href="/items/new" passHref>
          <Fab color="primary" aria-label="add" className={classes.fab}>
            <Add />
          </Fab>
        </Link>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`);
  const items = await res.json();
  return { props: { items } };
}
