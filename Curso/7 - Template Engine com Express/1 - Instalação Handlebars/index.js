import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'

// Instalação Handlebars:
// npm install express-handlebars

const app = express()
const port = 3000
const __dirname = import.meta.dirname

app.engine('html', exphbs.engine({
    extname: '.html'
}))
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home', {msg: 'Olá Mundo!', layout: false})
})

app.listen(port, () => {
    console.log('Executando na porta ' + port)
})