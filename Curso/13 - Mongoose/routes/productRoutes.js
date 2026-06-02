import { Router } from 'express'
import productController from '../controllers/productController.js'

const router = Router()

// Rotas GET
router.get('/', productController.showProducts)
router.get('/create', productController.createProduct)
router.get('/edit/:id', productController.editProduct)
router.get('/:id', productController.getProduct)

// Rotas POST
router.post('/create', productController.createProductPost)
router.post('/remove/:id', productController.removeProduct)
router.post('/edit', productController.editProductPost)

export {router as productRouter}