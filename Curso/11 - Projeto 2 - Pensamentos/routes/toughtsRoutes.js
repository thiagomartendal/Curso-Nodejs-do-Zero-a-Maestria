import { Router } from 'express'
import ToughtController from '../controllers/ToughtController.js'
import checkAuth from '../helpers/auth.js'

const router = Router()

// Rotas GET
router.get('/', ToughtController.showToughts)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/add', checkAuth, ToughtController.createTought)
router.get('/edit/:id', checkAuth, ToughtController.updateTought)

// Rotas POST
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.post('/remove', checkAuth, ToughtController.removeTought)
router.post('/edit', checkAuth, ToughtController.updateToughtSave)

export {router as toughtsRouter}