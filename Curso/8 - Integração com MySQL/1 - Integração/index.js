import express from 'express'
import exphbs from 'express-handlebars'
import mysql from 'mysql'
import path from 'path'

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

// Definição dos parâetros de conexão
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Node@1234',
    database: 'nodemysql'
})

// Estabelecimento da conexão ao mysql
conn.connect(function(err) {
    if (err) {
        console.log(err)
        return
    }

    console.log('Conectou ao MySQL')
})

app.get('/', (req, res) => {
    res.render('index')
})

// Rota para inserção de dados
app.post('/books/insert', (req, res) => {
    const title = req.body.title
    const pageqty = parseInt(req.body.pageqty)

    // Consulta sql para inserção no banco de dados
    const query = `INSERT INTO books (title, pageqty) VALUES (?, ?)`
    conn.query(query, [title, pageqty], (err) => {
        if (err)
            console.log(err)
    })

    res.redirect('/books')
})

// Rota para o resgate de dados
app.get('/books', (req, res) => {
    const query = 'SELECT * FROM books'
    conn.query(query, (err, data) => {
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
    conn.query(query, [id], (err, data) => {
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
    conn.query(query, [id], (err, data) => {
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
    conn.query(query, [title, pageqty, id], (err) => {
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
    conn.query(query, [id], (err) => {
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
