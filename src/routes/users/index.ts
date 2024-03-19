import Express from 'express';

import { validateAccessToken } from '../../auth';

import getUser from './getUser';
import getAllUsers from './getAllUsers';

import deleteUser from './deleteUser';

import loginUser from './loginUser';
import createUser from './createUser';

const router = Express.Router();

router.get('/user', validateAccessToken, getUser);
router.get('/users/all', getAllUsers);

router.delete('/user/delete/:id', validateAccessToken, deleteUser);

router.post('/users/login', loginUser);
router.post('/users/create', createUser);

export default router;