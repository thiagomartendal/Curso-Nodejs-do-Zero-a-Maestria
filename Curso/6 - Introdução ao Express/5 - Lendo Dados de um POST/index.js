import express from 'express'
import path from 'path'

const app = express()
const port = 3000
const basePath = path.join(import.meta.dirname, 'templates')

// Ler o body
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(basePath + '/index.html')
})

/**
 * A rota /users/add deve ser posicionada acima de /users/:id
 * para que /add não seja interpretada como um id
 */
app.get('/users/add', (req, res) => {
    res.sendFile(basePath + '/userform.html')
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    console.log('ID:' + id)

    res.sendFile(basePath + '/user.html')
})

app.post('/users/save', (req, res) => {
    const name = req.body.name
    const age = req.body.age

    console.log('Usuário: ' + name + ' - Idade: ' + age)

    res.sendFile(basePath + '/userform.html' )
})

app.listen(port, () => {
    console.log('Executando em ' + port)
})