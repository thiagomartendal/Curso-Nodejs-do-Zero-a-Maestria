import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
import conn from './db/conn.js'
import User from './models/User.js'

const app = express()
const port = 3000
const __dirname = import.meta.dirname

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(express.static('public'))
app.engine('html', exphbs.engine({
    extname: '.html'
}))
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.get('/', async (req, res) => {
    const users = await User.findAll({raw: true})

    res.render('index', {users})
})

app.get('/users/create', (req, res) => {
    res.render('addUser')
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id}})

    res.render('userView', {user})
})

app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    newsletter = (
        (newsletter === 'on') ?
        true : false
    )

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id

    await User.destroy({where: {id: id}})

    res.redirect('/')
})

/*
    conn.sync().then aplica um condicionamento onde a aplicação
    só é executada se as tabelas necessárias forem criadas
*/
conn.sync().then(() => {
    app.listen(port, () => {
        console.log('Executando na porta ' + port)
    })
}).catch(err => console.error(err))