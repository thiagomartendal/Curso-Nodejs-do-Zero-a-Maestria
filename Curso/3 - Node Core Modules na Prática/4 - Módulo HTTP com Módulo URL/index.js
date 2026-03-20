const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    const urlInfo = new URL(req.url, 'http://' + req.headers.host + '/')
    const name = urlInfo.searchParams.get('name')

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; Charset=utf-8')
    
    if (!name)
        res.end(
            `
                <h1>Preencha o nome.</h1>
                <form method="GET">
                    <input type="text" name="name" />
                    <input type="submit" value="Enviar" />
                </form>
            `
        )
    else
        res.end(`Bem-vindo ${name}`)
})

server.listen(port, () => {
    console.log('Servidor rodando na porta', port)
})