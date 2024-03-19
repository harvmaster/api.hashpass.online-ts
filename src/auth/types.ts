import Express from 'express'

export type AuthenticatedRequest<Params, Body> = Express.Request<Params, Body> & {
  user: string;
};
