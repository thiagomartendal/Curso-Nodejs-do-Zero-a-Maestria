import { Router } from 'express'
import { productRouter } from './productRoutes.js'

const router = Router()

router.use('/products', productRouter)

router.get('/', (req, res) => res.redirect('/products'))

export default router