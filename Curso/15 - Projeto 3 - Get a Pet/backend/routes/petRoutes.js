import { Router } from 'express'
import controller from '../controllers/petController.js'
import token from '../helpers/token.js'
import { imageUpload } from '../helpers/imageUpload.js'

const router = Router()

// Rotas GET
router.get('/', controller.getAll)
router.get('/mypets', token.checkToken, controller.getAllUserPets)
router.get('/myadoptions', token.checkToken, controller.getAllUserAdoptions)
router.get('/:id', controller.getPetById)

// Rotas POST
router.post('/create', token.checkToken, imageUpload.array('images'), controller.create)

// Rotas PATCH
router.patch('/:id', token.checkToken, imageUpload.array('images'), controller.updatePet)
router.patch('/schedule/:id', token.checkToken, controller.schedule)
router.patch('/conclude/:id', token.checkToken, controller.concludeAdoption)

// Rotas DELETE
router.delete('/:id', token.checkToken, controller.removePetById)

export {router as petRouter}