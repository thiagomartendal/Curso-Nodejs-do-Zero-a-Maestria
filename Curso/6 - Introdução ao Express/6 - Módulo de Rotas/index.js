import express from 'express'
import path from 'path'
import users from './users/users.js'

const app = express()
const port = 3000
const basePath = path.join(import.meta.dirname, 'templates')

// Ler o body
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(basePath + '/index.html')
})

app.listen(port, () => {
    console.log('Executando em ' + port)
})