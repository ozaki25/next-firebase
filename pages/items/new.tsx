import { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import firebase from '../../firebase/index';

export default function NewItem() {
  const [title, setTitle] = useState<string>('');

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ title });
    const db = firebase.firestore();
    const itemsCollection = db.collection('items');
    try {
      const doc = await itemsCollection.add({ title });
      const snapshot = await doc.get();
      console.log({ id: snapshot.id, ...snapshot.data() });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <Head>
        <title>New Item</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>New Item</h1>
        <form onSubmit={onSubmit}>
          <p>
            <label htmlFor="title">タイトル</label>
            <input id="title" name="title" onChange={onChangeTitle} />
          </p>
          <button>追加</button>
        </form>
      </main>
    </>
  );
}
