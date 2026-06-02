import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
import pool from './db/conn.js'

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

// Rota para inserção de dados
app.post('/books/insert', (req, res) => {
    const title = req.body.title
    const pageqty = parseInt(req.body.pageqty)

    // Consulta sql para inserção no banco de dados
    const query = `INSERT INTO books ('title', 'pageqty') VALUES (?, ?)`
    pool.query(query, [title, pageqty], (err) => {
        if (err)
            console.log(err)

        res.redirect('/books')
    })
})

// Rota para o resgate de dados
app.get('/books', (req, res) => {
    const query = 'SELECT * FROM books'
    pool.query(query, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const books = data
        res.render('books', {books})
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM books WHERE id = ?`
    pool.query(query, [id], (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]
        res.render('book', {book})
    })
})

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM books WHERE id = ?`
    pool.query(query, [id], (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]
        res.render('editBook', {book})
    })
})

/*
    Navegadores web não implementam métodos PUT e DELETE diretamente para formulários HTML,
    por isso as rotas para edição e exclusão de dados são definidas com método POST
*/

app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `UPDATE books SET title = ?, pageqty = ? WHERE id = ?`
    pool.query(query, [title, pageqty, id], (err) => {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM books WHERE id = ?`
    pool.query(query, [id], (err) => {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.listen(port, () => {
    console.log('Executando na porta ' + port)
})
