import Head from 'next/head';
import { Item } from '../interfaces';

interface HomeProps {
  items: Item[];
}

export default function Home({ items }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hello</h1>
        {items.map(item => (
          <p key={item.id}>{item.title}</p>
        ))}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`);
  const items = await res.json();
  return { props: { items } };
}
