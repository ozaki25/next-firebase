import { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import { Item } from '../../interfaces';

const defaultItem = {
  title: '',
  url: '',
  flag1: false,
  flag2: false,
};

export default function NewItem() {
  const [item, setItem] = useState<Item>(defaultItem);

  const onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const onChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name as keyof Item;
    setItem({ ...item, [key]: !item[key] });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ item });
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`, {
      method: 'POST',
      body: JSON.stringify(item),
    });
    alert(`success!${JSON.stringify(item)}`);
    setItem(defaultItem);
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
            <input
              id="title"
              name="title"
              value={item.title}
              onChange={onChangeText}
            />
          </p>
          <p>
            <label htmlFor="url">URL</label>
            <input
              id="url"
              name="url"
              value={item.url}
              onChange={onChangeText}
            />
          </p>
          <p>
            <label htmlFor="flag1">フラグ1</label>
            <input
              id="flag1"
              name="flag1"
              type="checkbox"
              checked={item.flag1}
              onChange={onChangeRadio}
            />
          </p>
          <p>
            <label htmlFor="flag2">フラグ2</label>
            <input
              id="flag2"
              name="flag2"
              type="checkbox"
              checked={item.flag2}
              onChange={onChangeRadio}
            />
          </p>
          <button>追加</button>
        </form>
      </main>
    </>
  );
}
