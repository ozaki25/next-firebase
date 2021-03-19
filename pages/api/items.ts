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
  const [items, itemsOrder] = await Promise.all([
    getItems(db),
    getItemsOrder(db),
  ]);
  console.log(items.map(({ id, title }) => ({ id, title })));

  const orderedItems = itemsOrder.order
    .map(id => {
      return items.find(item => item.id === id);
    })
    .filter(Boolean) as Item[];

  console.timeEnd('all');

  res.status(200).json(orderedItems);
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
  const { id } = snapshot;

  const itemsOrder = await getItemsOrder(db);
  await db
    .collection('items-order')
    .doc('1')
    .set({
      order: [...itemsOrder.order, id],
    });

  const item = { id, ...snapshot.data() } as Item;
  console.log({ item });

  res.status(200).json(item);
}

async function getItems(db: FirebaseFirestore.Firestore) {
  console.time('firestore:getItems');
  const snapshot = await db.collection('items').get();
  console.timeEnd('firestore:getItems');
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item));
}

async function getItemsOrder(db: FirebaseFirestore.Firestore) {
  console.time('firestore:getItemsOrder');
  const snapshot = await db.collection('items-order').doc('1').get();
  console.timeEnd('firestore:getItemsOrder');
  return snapshot.data() as ItemsOrder;
}
