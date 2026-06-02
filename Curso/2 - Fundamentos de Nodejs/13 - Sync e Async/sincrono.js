// Forma síncrona: o código espera ser totalmente executado para prosseguir

const fs = require('fs')

console.log('Início')

fs.writeFileSync('arquivo.txt', 'Olá Mundo!')

console.log('Fim')