import type { NextApiRequest, NextApiResponse } from 'next';
import firebase from '../../firebase';
import { Item } from '../../interfaces';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Item[] | Item | string>,
) {
  console.log(req.method, req.url);
  if (req.method === 'GET') return get(req, res);
  if (req.method === 'POST') return post(req, res);
  res.status(405).json('Method Not Allowed');
}

async function get(req: NextApiRequest, res: NextApiResponse<Item[]>) {
  const db = firebase.firestore();
  const snapshot = await db.collection('items').get();

  const items = snapshot.docs.map(doc => {
    const data = doc.data();
    return { id: doc.id, title: data.title } as Item;
  });
  console.log({ items });

  res.status(200).json(items);
}

async function post(req: NextApiRequest, res: NextApiResponse<Item>) {
  console.log({ body: req.body });
  const body = JSON.parse(req.body) as Item;
  const db = firebase.firestore();
  const doc = await db.collection('items').add(body);

  const snapshot = await doc.get();
  const item = { id: snapshot.id, ...snapshot.data() } as Item;
  console.log({ item });

  res.status(200).json(item);
}
