import { Request, Response } from 'express';

import User from '../../models/User';
import Service from '../../models/Service';

type CreateUserRequestBody = {
  username: string;
  password: string;
}

const createUser = async (req: Request<CreateUserRequestBody>, res: Response) => {
  const errors: string[] = []
  if (!req.body.user?.username) errors.push(`Username can't be blank`)
  if (!req.body.user?.password) errors.push(`Password can't be blank`)
  if (errors.length) return res.status(422).json({ errors })
  
  const { username, password } = req.body.user

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ errors: ['Username already taken']});
  }

  const user = new User({ username })
  user.setPassword(password)

  await user.save()

  const services = await Service.find({ user: user._id });
  const formattedServices = await Promise.all(services.map(async (service) => service.toJSONData()));

  return res.json({
    user: user.toAuthJSON(),
    services: formattedServices,
  });
}

export default createUser;