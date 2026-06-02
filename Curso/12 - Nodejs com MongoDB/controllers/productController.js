import product from '../models/product.js'

// Funções de rotas GET

async function showProducts(req, res) {
    const products = await product.getProducts()

    res.render('products/all', {products})
}

async function getProduct(req, res) {
    const id = req.params.id
    const selectedProduct = await product.getProductById(id)
    
    res.render('products/product', {product: selectedProduct})
}

function createProduct(req, res) {
    res.render('products/create')
}

async function editProduct(req, res) {
    const id = req.params.id

    const selectedProduct = await product.getProductById(id)

    res.render('products/edit', {product: selectedProduct})
}

// Funções de rotas POST

async function createProductPost(req, res) {
    const {name, image, price, description} = req.body

    await product.save(name, image, price, description)

    res.redirect('/products')
}

async function removeProduct(req, res) {
    const id = req.params.id

    await product.removeProductById(id)

    res.redirect('/products')
}

async function editProductPost(req, res) {
    const {id, name, image, price, description} = req.body

    await product.updateProduct(id, {name, image, price, description})

    res.redirect('/products')
}

export default {showProducts, getProduct, createProduct, editProduct, createProductPost, removeProduct, editProductPost}