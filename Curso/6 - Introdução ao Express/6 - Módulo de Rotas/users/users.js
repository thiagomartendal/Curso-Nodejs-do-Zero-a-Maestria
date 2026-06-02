import express from 'express'
import path from 'path'

const router = express.Router()
const basePath = path.join(import.meta.dirname, '../templates')

/**
 * A rota /users/add deve ser posicionada acima de /users/:id
 * para que /add não seja interpretada como um id
 */
router.get('/add', (req, res) => {
    res.sendFile(basePath + '/userform.html')
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    console.log('ID:' + id)

    res.sendFile(basePath + '/user.html')
})

router.post('/save', (req, res) => {
    const name = req.body.name
    const age = req.body.age

    console.log('Usuário: ' + name + ' - Idade: ' + age)

    res.sendFile(basePath + '/userform.html' )
})

export default router