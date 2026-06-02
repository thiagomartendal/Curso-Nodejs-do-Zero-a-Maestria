import express from 'express'
import path from 'path'
import page from './page/page.js'

const app = express()
const port = 5000
const basePath = path.join(import.meta.dirname, 'templates')

app.use('/page', page)
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(basePath + '/index.html')
})

app.listen(port, () => {
    console.log('Executando na porta ' + port)
})