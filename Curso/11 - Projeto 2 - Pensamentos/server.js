import express from 'express'
import exphbs from 'express-handlebars'
import session from 'express-session'
import sessionFS from 'session-file-store'
import flash from 'express-flash'
import path from 'path'
import os from 'os'
import conn from './db/conn.js'
import router from './routes/router.js'

const FileStore = sessionFS(session)
const app = express()
const __dirname = import.meta.dirname

// Configuração para leitura do corpo da requisição
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json()) // Habilita a leitura de JSON em requisições

// Configuração do middleware de sessão
app.use(
    session({
        name: 'session', // Nome da sessão
        secret: 'segredo_da_sessão', // Segredo (quanto mais forte melhor)
        resave: false, // Não salva a sessão automaticamente
        saveUninitialized: false,
        store: new FileStore({ // Define o local onde as sessões serão salvas quando iniciadas
            logFn: function() {},
            path: path.join(os.tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false, // Para produção com HTTPS deve ser true
            maxAge: 1000 * 60 * 60 * 24, // Sessão dura um dia (24h)
            httpOnly: true
        }
    })
)

// Flash Messages
app.use(flash())

// Atribui a sessão da requisição para a resposta
app.use((req, res, next) => {
    if (req.session.userid)
        res.locals.session = req.session

    next()
})

// Middleware global para limpar a flash message após sua renderização
app.use((req, res, next) => {
    const message = req.flash('message')
    res.locals.message = message[0] || null
    next()
})

// Definição de pasta para arquivos estáticos
app.use(express.static('public'))

// Atribuição do roteador principal
app.use(router)

// Configuração da template engine com a pasta views
app.engine('html', exphbs.engine({
    extname: '.html'
}))
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => console.error(err))