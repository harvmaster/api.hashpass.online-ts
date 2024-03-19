import { Response, RequestHandler } from 'express';
import type { AuthenticatedRequest } from '../../auth';

import User from '../../models/User';
import Service from '../../models/Service';

const deleteUser: RequestHandler = async (req: AuthenticatedRequest<{}, {}>, res: Response) => {
  const user = await User.findOne({ _id: req.user });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  await Service.deleteMany({ user: req.user })
  await User.deleteOne({ _id: req.user })

  res.json({
    status: 'successful'
  });
}

export default deleteUser;