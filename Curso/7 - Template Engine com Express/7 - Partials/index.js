import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'

const app = express()
const port = 3000
const __dirname = import.meta.dirname

// Definição do diretório de partials
const hbs = exphbs.create({
    partialsDir: ['views/partials'],
    extname: '.html'
})

app.engine('html', hbs.engine)
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
    const items = ['Item a', 'Item b', 'Item c']
    res.render('dashboard', {items})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Título do Post',
        category: 'Categoria A',
        body: 'Conteúdo do post no blog.'
    }
    res.render('blogpost', {post})
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Post 1',
            category: 'Categoria A',
            body: 'Conteúdo do post 1.'
        },
        {
            title: 'Post 2',
            category: 'Categoria B',
            body: 'Conteúdo do post 2.'
        },
        {
            title: 'Post 3',
            category: 'Categoria C',
            body: 'Conteúdo do post 3.'
        }
    ]
    res.render('blog', {posts})
})

app.listen(port, () => {
    console.log('Executando na porta ' + port)
})