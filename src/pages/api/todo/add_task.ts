import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorBody, ServerCommonError } from '@/lib/api/error.server';
import { addTask } from '@/lib/api/todoUtil.server';

type ReqBody = {
  title: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    if (req.method === 'POST') {
      throw new ServerCommonError(ErrorBody.BAD_REQUEST);
    }
    const { title } = req.body as ReqBody;
    await addTask(title);
    res.status(204).json({});
  } catch (error) {
    if (!(error instanceof ServerCommonError)) {
      res.status(ErrorBody.INTERNAL_SERVER_ERROR.status).json(ErrorBody.INTERNAL_SERVER_ERROR);
    }
    const serverError = error as ServerCommonError;
    const { status, ...errorDetails } = serverError;
    res.status(status).json(errorDetails);
  }
};

export default handler;
