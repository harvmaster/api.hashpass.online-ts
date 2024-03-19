import { Response, RequestHandler } from 'express';
import type { AuthenticatedRequest } from '../../auth';

// This route no longer returns data due to security issues
const getAllUsers: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  res.json([])
}

export default getAllUsers;