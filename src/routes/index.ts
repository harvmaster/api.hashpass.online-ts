import Express from 'express'

import users from './users'
import services from './services'
// import uploads from './uploads'

const router = Express.Router()

router.use('/', users)
router.use('/services', services)
// router.use('/uploads', uploads)

export default router