const minimist = require('minimist') // módulo externo
const soma = require('./soma').soma // módulo interno

const args = minimist(process.argv.slice(2))

const a = parseInt(args['a'])
const b = parseInt(args['b'])

soma(a, b)

// node index.js --a=4 --b=5