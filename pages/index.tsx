import Head from 'next/head';
import { Item } from '../interfaces';
import firebase from '../firebase/index';

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
  const db = firebase.firestore();
  const itemsCollection = db.collection('items');
  const snapshot = await itemsCollection.get();
  const items = snapshot.docs.map(doc => {
    const data = doc.data();
    return { id: doc.id, title: data.title } as Item;
  });

  return { props: { items } };
}
