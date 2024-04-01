import { logError } from '@/lib/common/logError.server';
import { ServerErrorMessage } from '@/lib/data/serverErrorMessage';

export class ServerCommonError extends Error {
  type: string;
  message: string;
  code: string;
  status: number;
  constructor(body: ErrorBody, errorMessage: ServerErrorMessage) {
    logError(errorMessage);
    super(body.message);
    this.type = body.type;
    this.message = body.message;
    this.code = body.code;
    this.status = body.status;
  }
}

export const ErrorBody = {
  BAD_REQUEST: {
    code: 'E0000',
    type: 'BadRequest',
    message: 'パラメータに不備があります',
    status: 400,
  },
  NOT_FOUNDED_TASK: {
    code: 'E0002',
    type: 'NotFoundedTask',
    message: 'タスクが見つかりません',
    status: 404,
  },
  INTERNAL_SERVER_ERROR: {
    code: 'E0001',
    type: 'InternalServerError',
    message: 'Internal server error',
    status: 500,
  },
} as const;

export type ErrorBody = (typeof ErrorBody)[keyof typeof ErrorBody];
