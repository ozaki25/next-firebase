import { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';

export default function NewItem() {
  const [title, setTitle] = useState<string>('');

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ title });
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
