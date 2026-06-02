import express from 'express'
import path from 'path'

const app = express()
const port = 3000
const basePath = path.join(import.meta.dirname, 'templates')

app.get('/', (req, res) => {
    res.sendFile(basePath + '/index.html')
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    console.log('ID:' + id)

    res.sendFile(basePath + '/user.html')
})

app.listen(port, () => {
    console.log('Executando em ' + port)
})