import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'

const router = Router()

// Rotas GET
router.get('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.get('/register', AuthController.register)

// Rotas POST
router.post('/login', AuthController.loginPost)
router.post('/register', AuthController.registerPost)

export {router as authRouter}