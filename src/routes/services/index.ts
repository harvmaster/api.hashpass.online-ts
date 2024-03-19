import Express from 'express';

import { validateAccessToken } from '../../auth';

import getServices from './getServices'
import deleteService from './deleteService'
import updateService from './updateService'
import createService from './createService'

const router = Express.Router();

router.get('/all', validateAccessToken, getServices);
router.get('/:user', validateAccessToken, getServices)

router.delete('/:user/:service', validateAccessToken, deleteService)

router.put('/:user/:service', validateAccessToken, updateService)

router.post('/create', validateAccessToken, createService)

export default router;