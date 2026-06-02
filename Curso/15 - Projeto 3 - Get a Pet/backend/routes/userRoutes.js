import { Router } from 'express'
import controller from '../controllers/userController.js'
import token from '../helpers/token.js'
import { imageUpload } from '../helpers/imageUpload.js'

const router = Router()

// Rotas GET
router.get('/checkuser', controller.checkUser)
router.get('/:id', controller.getUserById)

// Rotas POST
router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.post('/checkauth', controller.checkauth)

// Rotas PATCH
router.patch('/edit/:id', token.checkToken, imageUpload.single('image'), controller.editUser)

export {router as userRouter}