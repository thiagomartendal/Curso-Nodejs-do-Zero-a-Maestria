import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
import conn from './db/conn.js'
import router from './routes/router.js'

const app = express()
const __dirname = import.meta.dirname
const port = 3000

// Habilita o recebimento de requisições com corpo de dados
app.use(
    express.urlencoded({
        extended: true
    })
)

// Habilita o uso de JSON nas requisições
app.use(express.json())

// Diretório de arquivos estáticos
app.use(express.static('public'))

// Utiliza o roteador central
app.use(router)

// Define o leitor de páginas HTML
app.engine('html', exphbs.engine({
    extname: '.html'
}))
app.set('view engine', 'html')

// Habilita o diretório de páginas HTML
app.set('views', path.join(__dirname, 'views'))

app.listen(port, () => 
    console.log('Executando na porta', port)
)