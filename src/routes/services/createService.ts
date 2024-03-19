import { Response, RequestHandler } from 'express';
import type { AuthenticatedRequest } from '../../auth';

import User from '../../models/User';
import Service from '../../models/Service';

import getLogo from './getLogo'

type ServiceCreateRequestBody = {
  name: string;
  legacy: boolean;
}

const createService: RequestHandler = async (req: AuthenticatedRequest<any, ServiceCreateRequestBody>, res: Response) => {
  const user = await User.findOne({ _id: req.user });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const name = req.body.service
  const legacy = req.body.legacy == undefined ? false : req.body.legacy

  // Check if its unique
  const existingService = await Service.findOne({ user: req.user, name })
  if (existingService) return res.status(409).json({ errors: ['Service name must be unique']})

  const service = new Service({
    name, user: req.user, legacy
  })
  service.logo = await getLogo(name)

  await service.save()

  return res.json({
    service: await service.toJSONData()
  });
}

export default createService;