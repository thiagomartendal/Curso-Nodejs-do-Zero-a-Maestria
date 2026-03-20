const chalk = require('chalk')

nota = 6

if (nota >= 7)
    console.log(chalk.green.bold('Você está aprovado.'))
else if (nota < 7 && nota >= 3)
    console.log(chalk.bgRed.black('Você está em recuperação.'))
else
    console.log(chalk.red.bold('Você está reprovado.'))