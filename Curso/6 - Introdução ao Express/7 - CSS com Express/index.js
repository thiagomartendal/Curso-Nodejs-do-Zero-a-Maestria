import express from 'express'
import path from 'path'
import users from './users/users.js'

const app = express()
const port = 3000
const basePath = path.join(import.meta.dirname, 'templates')

app.use(express.urlencoded({
    extended: true
})) // Ler o body
app.use(express.json())
app.use('/users', users)
app.use(express.static('public')) // Arquivos estáticos

app.get('/', (req, res) => {
    res.sendFile(basePath + '/index.html')
})

app.listen(port, () => {
    console.log('Executando em ' + port)
})