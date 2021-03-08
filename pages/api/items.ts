import type { NextApiRequest, NextApiResponse } from 'next';
import firebase from '../../firebase';
import { Item, ItemsOrder } from '../../interfaces';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Item[] | Item | string>,
) {
  console.time('all');
  console.log(req.method, req.url);
  if (req.method === 'GET') return get(req, res);
  if (req.method === 'POST') return post(req, res);
  res.status(405).json('Method Not Allowed');
}

async function get(req: NextApiRequest, res: NextApiResponse<Item[]>) {
  const db = firebase.firestore();

  const itemsOrder = await getItemsOrder(db);
  console.log(itemsOrder.order);

  const items = await getItems(db);
  console.log({ items });

  console.timeEnd('all');

  res.status(200).json(items);
}

async function post(req: NextApiRequest, res: NextApiResponse<Item>) {
  console.log({ body: req.body });
  const body = JSON.parse(req.body) as Item;
  const db = firebase.firestore();
  const doc = await db.collection('items').add({
    ...body,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });

  const snapshot = await doc.get();
  const item = { id: snapshot.id, ...snapshot.data() } as Item;
  console.log({ item });

  res.status(200).json(item);
}

async function getItems(db: FirebaseFirestore.Firestore) {
  console.time('firestore');
  const snapshot = await db
    .collection('items')
    .orderBy('flag1', 'desc')
    .orderBy('flag2', 'desc')
    .orderBy('title')
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item));
}

async function getItemsOrder(db: FirebaseFirestore.Firestore) {
  console.time('firestore');
  const snapshot = await db.collection('items-order').doc('1').get();
  console.timeEnd('firestore');
  return snapshot.data() as ItemsOrder;
}
