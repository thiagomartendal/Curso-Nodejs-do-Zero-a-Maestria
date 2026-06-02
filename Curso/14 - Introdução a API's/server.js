import express from 'express'

const app = express()
const port = 3000

// Habilita a leitura do corpo de requisições
app.use(
    express.urlencoded({
        extended: true
    })
)

// Habilita o uso de JSON em requisições
app.use(express.json())

// Rota GET
app.get('/', (req, res) => {
    res.status(200).json({message: 'Primeira rota'})
})

// Rota POST
app.post('/createproduct', (req, res) => {
    const {name, price} = req.body

    if (!name) {
        res.status(422).json({msg: 'O nome do produto não foi informado.'})
        return
    }

    console.log(name, price)

    res.status(201).json({msg: `Produto: ${name} - Preço: R$${price}`})
})

app.listen(port, () => console.log('Executando na porta', port))