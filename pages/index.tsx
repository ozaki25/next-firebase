import Head from 'next/head';
import { items } from '../data';
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

export async function getStaticProps() {
  return { props: { items } };
}
