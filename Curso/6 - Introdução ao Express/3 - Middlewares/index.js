import express from 'express'
import path from 'path'

const app = express()
const port = 3000
const basePath = path.join(import.meta.dirname, 'templates')

const checkAuth = (req, res, next) => {
    req.authStatus = true

    if (req.authStatus) {
        console.log('Logado')
        next() // Permite seguir para a função da rota
    } else
        console.log('Não logado') // Deve redirecionar para uma rota de erro
}

app.use(checkAuth) // Ativa o middleware checkAuth

app.get('/', (req, res) => {
    res.sendFile(basePath + '/index.html')
})

app.listen(port, () => {
    console.log('Executando em ' + port)
})