import type { NextApiRequest, NextApiResponse } from 'next';
import firebase from '../../firebase';
import { Item } from '../../interfaces';

export default async (req: NextApiRequest, res: NextApiResponse<Item[]>) => {
  if (req.method === 'GET') {
    const db = firebase.firestore();
    const itemsCollection = db.collection('items');
    const snapshot = await itemsCollection.get();
    const items = snapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, title: data.title } as Item;
    });

    res.status(200).json(items);
  }
};
