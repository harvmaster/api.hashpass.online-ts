import { Response, RequestHandler } from 'express';
import type { AuthenticatedRequest } from '../../auth';

import User from '../../models/User';
import Service from '../../models/Service';

type DeleteServiceRequestParams = {
  service: string
}

const deleteService: RequestHandler = async (req: AuthenticatedRequest<DeleteServiceRequestParams, any>, res: Response) => {
  const user = await User.findOne({ _id: req.user });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const serviceId = req.params.service
  if (!serviceId) return res.status(400).json({ errors: ['Service ID is require parameter'] })
  await Service.deleteOne({ user: req.user, name: serviceId })

  return res.json({
    status: 'successful'
  });
}

export default deleteService;