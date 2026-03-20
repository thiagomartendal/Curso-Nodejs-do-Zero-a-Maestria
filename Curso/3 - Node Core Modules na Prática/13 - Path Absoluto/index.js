const path = require('path')

// path absoluto
console.log(path.resolve('teste.txt'))

// formar path
const midfolder = 'ralatorios'
const file = 'relatorio1.pdf'

const finalPath = path.join('/', 'arquivos', midfolder, file)

console.log(finalPath)