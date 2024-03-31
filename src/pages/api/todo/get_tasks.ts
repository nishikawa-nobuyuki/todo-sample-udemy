import { NextApiRequest, NextApiResponse } from 'next';

import { getTasks } from '@/lib/api/todoUtil.server';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'GET') {
    const tasks = await getTasks();
    res.status(200).json({ records: tasks });
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
