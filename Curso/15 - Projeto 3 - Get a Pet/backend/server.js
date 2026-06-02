import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import cookieEncrypter from '@hmcts/cookie-encrypter'
import router from './routes/router.js'

const app = express()
const port = 4000

// Habilita o JSON para requisições
app.use(express.json())

// Configura o CORS
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

// Habilita o uso de cookies
app.use(cookieParser('umsegredoparaaassinaturadecookie'))
app.use(cookieEncrypter('umsegredoparaaassinaturadecookie'))

// Configura o diretório de imagens
app.use(express.static('public'))

// Configura o diretório de arquivos do usuário
app.use('/data', express.static('../data'))

// Habilita o roteador
app.use(router)

// Escuta a porta do servidor
app.listen(port, () => console.log('Escutando na porta', port))