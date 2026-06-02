import Product from '../models/product.js'

// Funções de rotas GET

async function showProducts(req, res) {
    const products = await Product.find().lean()

    res.render('products/all', {products})
}

async function getProduct(req, res) {
    const id = req.params.id
    const selectedProduct = await Product.findById(id).lean()
    
    res.render('products/product', {product: selectedProduct})
}

function createProduct(req, res) {
    res.render('products/create')
}

async function editProduct(req, res) {
    const id = req.params.id

    const selectedProduct = await Product.findById(id).lean()

    res.render('products/edit', {product: selectedProduct})
}

// Funções de rotas POST

async function createProductPost(req, res) {
    const {name, image, price, description} = req.body
    const product = new Product({name, price, description, image})

    await product.save()

    res.redirect('/products')
}

async function removeProduct(req, res) {
    const id = req.params.id

    await Product.deleteOne({_id: id})

    res.redirect('/products')
}

async function editProductPost(req, res) {
    const {id, name, image, price, description} = req.body

    await Product.updateOne({_id: id}, {name, price, description, image})

    res.redirect('/products')
}

export default {showProducts, getProduct, createProduct, editProduct, createProductPost, removeProduct, editProductPost}