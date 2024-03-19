import { Request, Response } from 'express';

import User from '../../models/User';
import Service from '../../models/Service';

type CreateUserRequestBody = {
  username: string;
  password: string;
}

const loginUser = async (req: Request<CreateUserRequestBody>, res: Response) => {
  const errors: string[] = []
  if (!req.body.user?.username) errors.push(`Username can't be blank`)
  if (!req.body.user?.password) errors.push(`Password can't be blank`)
  if (errors.length) return res.status(422).json({ errors })
  
  const { username, password } = req.body.user

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  if (!user.validPassword(password)) return res.status(401).json({ errors: ['Username or Password are incorrect'] })

  const services = await Service.find({ user: user._id });
  const formattedServices = await Promise.all(services.map(async (service) => service.toJSONData()));

  return res.json({
    user: user.toAuthJSON(),
    services: formattedServices,
  });
}

export default loginUser;