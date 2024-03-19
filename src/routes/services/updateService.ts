import { Response, RequestHandler } from 'express';
import type { AuthenticatedRequest } from '../../auth';

import User from '../../models/User';
import Service from '../../models/Service';

type ServiceUpdateRequestParams = {
  service: string
}

type ServiceUpdateRequestBody = {
  legacy: boolean;
}

const updateService: RequestHandler = async (req: AuthenticatedRequest<ServiceUpdateRequestParams, ServiceUpdateRequestBody>, res: Response) => {
  const user = await User.findOne({ _id: req.user });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const { service } = req.params
  const { legacy } = req.body

  await Service.findOneAndUpdate({ user: req.user, name: service }, { legacy })

  return res.send('Successfully Updated');
}

export default updateService;