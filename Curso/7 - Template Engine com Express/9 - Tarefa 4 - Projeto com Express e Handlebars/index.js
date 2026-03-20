import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'

const app = express()
const port = 3000
const __dirname = import.meta.dirname

const hbs = exphbs.create({
    extname: '.html',
    partialsDir: ['views/partials']
})

app.engine('html', hbs.engine)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

const produtos = [
    {
        nome: 'Arroz',
        quantidade: 50,
        preco: 5.50
    },
    {
        nome: 'Feijão',
        quantidade: 30,
        preco: 2.50
    },
    {
        nome: 'Costela Bovina',
        quantidade: 80,
        preco: 30.0
    }
]

app.get('/', (req, res) => {
    res.render('index', {produtos})
})

app.get('/:id', (req, res) => {
    const id = req.params.id
    const produto = produtos[id]
    res.render('produto', {produto})
})

app.listen(port, () => {
    console.log('Executando na porta ' + port)
})