import { Response, RequestHandler } from 'express';
import type { AuthenticatedRequest } from '../../auth';
import User from '../../models/User';

// This route no longer returns data due to security issues
const getAllUsers: RequestHandler = async (req: AuthenticatedRequest<{}, {}>, res: Response) => {
  const users = await User.find({})
  const formattedUsers = users.map(user => {
    const { username, _id } = user
    return {
      username,
      _id
    }
  })
  res.json(formattedUsers)
}

export default getAllUsers;