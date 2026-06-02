import { ObjectId } from 'mongodb'
import conn from '../db/conn.js'

async function save(name, image, price, description) {
    const product = await conn.db().collection('products').insertOne({
        name,
        image,
        price,
        description
    })

    return product
}

async function getProducts() {
    const products = await conn.db().collection('products').find().toArray()

    return products
}

async function getProductById(id) {
    const product = await conn.db().collection('products').findOne({_id: new ObjectId(id)})

    return product
}

async function removeProductById(id) {
    await conn.db().collection('products').deleteOne({_id: new ObjectId(id)})
}

async function updateProduct(id, data) {
    await conn.db().collection('products').updateOne({_id: new ObjectId(id)}, {$set: data})
}

export default {save, getProducts, getProductById, removeProductById, updateProduct}