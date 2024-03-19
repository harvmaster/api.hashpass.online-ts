import { Response, RequestHandler } from 'express';
import type { AuthenticatedRequest } from '../../auth';

import User from '../../models/User';
import Service from '../../models/Service';

const getServices: RequestHandler = async (req: AuthenticatedRequest<{}, {}>, res: Response) => {
  const user = await User.findOne({ _id: req.user });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const services = await Service.find({ user: user._id });
  const formattedServices = await Promise.all(services.map(async (service) => service.toJSONData()));

  return res.json({
    user: req.user,
    services: formattedServices,
  });
}

export default getServices;