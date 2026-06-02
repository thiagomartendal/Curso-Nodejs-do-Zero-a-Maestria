import { Router } from 'express'
import { userRouter } from './userRoutes.js'
import { petRouter } from './petRoutes.js'

const router = Router()

router.use('/users', userRouter)
router.use('/pets', petRouter)

export default router