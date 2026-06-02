import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
import conn from './db/conn.js'

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

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log('Executando na porta ' + port)
})
