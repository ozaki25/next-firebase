import type { NextApiRequest, NextApiResponse } from 'next';
import firebase from '../../firebase';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string[] | string>,
) {
  console.time('all');
  console.log(req.method, req.url);
  if (req.method === 'POST') return post(req, res);
  res.status(405).json('Method Not Allowed');
}

async function post(req: NextApiRequest, res: NextApiResponse<string[]>) {
  console.log({ body: req.body });
  const body = JSON.parse(req.body) as string[];
  const db = firebase.firestore();

  console.time('firestore:post:items-order');
  await db.collection('items-order').doc('1').set({
    order: body,
  });
  console.timeEnd('firestore:post:items-order');

  console.timeEnd('all');
  res.status(200).json(body);
}
