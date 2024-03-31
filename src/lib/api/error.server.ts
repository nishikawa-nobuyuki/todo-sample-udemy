export class ServerCommonError extends Error {
  type: string;
  message: string;
  code: string;
  status: number;
  constructor(args: ErrorBody) {
    super(args.message);
    this.type = args.type;
    this.message = args.message;
    this.code = args.code;
    this.status = args.status;
  }
}

export const ErrorBody = {
  BAD_REQUEST: {
    code: 'E0000',
    type: 'BadRequest',
    message: 'パラメータに不備があります',
    status: 400,
  },
  INTERNAL_SERVER_ERROR: {
    code: 'E0001',
    type: 'InternalServerError',
    message: 'Internal server error',
    status: 500,
  },
} as const;

export type ErrorBody = (typeof ErrorBody)[keyof typeof ErrorBody];
