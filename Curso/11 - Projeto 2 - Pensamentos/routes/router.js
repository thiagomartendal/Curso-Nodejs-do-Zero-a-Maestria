import { Router } from 'express'
import { toughtsRouter } from './toughtsRoutes.js'
import { authRouter } from './authRouts.js'
import ToughtController from '../controllers/ToughtController.js'

const router = Router()

router.get('/', ToughtController.showToughts) // Definido também para acessar a página inicial na rota principal (sem /toughts)

router.use('/', authRouter)
router.use('/toughts', toughtsRouter)

export default router