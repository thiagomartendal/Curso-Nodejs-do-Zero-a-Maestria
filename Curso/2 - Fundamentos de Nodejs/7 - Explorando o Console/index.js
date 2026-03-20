// Mais de um valor
const x = 10
const y = 'Olá mundo!'
const z = [1, 2]

console.log(x, y, z)

// Contagem de impressões
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)

// Variável entre string
console.log('%s', y)

// Limpar o console
setTimeout(() => {
    console.clear()
}, 2000)