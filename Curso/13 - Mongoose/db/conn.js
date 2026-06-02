import mongoose from 'mongoose'

async function main() {
    await mongoose.connect('mongodb://localhost:27017/testemongoose')
    console.log('Conectado ao MongoDB')
}

main().catch(err => console.error(err))

export default mongoose