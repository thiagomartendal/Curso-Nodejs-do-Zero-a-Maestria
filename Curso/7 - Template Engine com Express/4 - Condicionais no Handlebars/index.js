import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'

const app = express()
const port = 3000
const __dirname = import.meta.dirname

app.engine('html', exphbs.engine({
    extname: '.html'
}))
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const user1 = {
        name: 'Usuário 1',
        email: 'us1@email.com',
        age: 25
    }
    const auth = true
    const approved = true
    res.render('home', {user: user1, status: 'Cadastrado', auth, approved})
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.listen(port, () => {
    console.log('Executando na porta ' + port)
})