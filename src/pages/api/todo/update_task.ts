import { NextApiRequest, NextApiResponse } from 'next';

import { updateTask } from '@/lib/api/todoUtil.server';

type ReqBody = {
  id: string;
  fields: { title?: string; completed?: boolean };
};

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST') {
    const { id, fields } = req.body as ReqBody;
    await updateTask(id, fields);
    res.status(204).json({});
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
