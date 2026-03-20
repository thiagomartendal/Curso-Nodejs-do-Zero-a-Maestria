const inquirer = require('inquirer')
const chalk = require('chalk')

try {
    inquirer.prompt([
        {
            name: 'p1', message: 'Qual o seu nome?',
        },
        {
            name: 'p2', message: 'Qual a sua idade?',
        }
    ])
        .then((answers) => {
            const nome = answers.p1
            const idade = answers.p2
            console.log(chalk.bgYellow.black(`${nome} tem ${idade} anos.`))
        })
        .catch(err => console.log(err))
} catch (err) {
    console.log(`Erro: ${err}`)
}