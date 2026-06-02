// Forma assíncrona: o código continua progredindo e em um ponto futuro obtém a resposta da execução assíncrona

const fs = require('fs')

console.log('Início')

fs.writeFile('arquivo.txt', 'Olá Mundo!', function(err) {
    setTimeout(function() {
        console.log('Arquivo criado!')
    }, 100)
})

console.log('Fim')