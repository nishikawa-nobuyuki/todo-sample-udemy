import { NextApiRequest, NextApiResponse } from 'next';

import { deleteTask } from '@/lib/api/todoUtil.server';

type ReqBody = {
  id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'DELETE') {
    const { id } = req.body as ReqBody;
    await deleteTask(id);
    res.status(204).json({});
  } else {
    res.setHeader('Allow', 'DELETE');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
