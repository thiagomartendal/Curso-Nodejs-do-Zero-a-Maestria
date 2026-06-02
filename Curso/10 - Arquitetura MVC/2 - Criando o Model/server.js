import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
import conn from './db/conn.js'
import Task from './models/Task.js'

const app = express()
const port = 3000
const __dirname = import.meta.dirname

// Configuração para leitura do corpo da requisição
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json()) // Habilita a leitura de JSON em requisições

// Definição de pasta para arquivos estáticos
app.use(express.static('public'))

// Configuração da template engine com a pasta views
app.engine('html', exphbs.engine({
    extname: '.html'
}))
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

conn
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log('Executando na porta', port)
        })
    })
    .catch(err => console.error(err))