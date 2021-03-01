import Head from 'next/head';
import { Container } from '@material-ui/core';
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
      <Container component="main" maxWidth="md">
        {items.map(item => (
          <p key={item.id}>
            <a href={item.url}>{item.title}</a>
            {item.flag1 ? '○' : 'x'}
            {item.flag2 ? '○' : 'x'}
          </p>
        ))}
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`);
  const items = await res.json();
  return { props: { items } };
}
