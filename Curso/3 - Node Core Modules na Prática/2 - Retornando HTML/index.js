const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; Charset=utf-8')
    res.end('<h1>Olá Mundo!</h1>')
})

server.listen(port, () => {
    console.log('Servidor rodando na porta', port)
})