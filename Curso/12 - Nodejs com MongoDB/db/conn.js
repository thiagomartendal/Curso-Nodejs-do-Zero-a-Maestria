import { MongoClient } from 'mongodb'

const uri = 'mongodb://localhost:27017/testemongodb'

const client = new MongoClient(uri)

async function run() {
    try {
        await client.connect(uri)
        console.log('Conectado ao MongoDB')
    } catch (error) {
        console.error(error)
    }
}

run()

export default client