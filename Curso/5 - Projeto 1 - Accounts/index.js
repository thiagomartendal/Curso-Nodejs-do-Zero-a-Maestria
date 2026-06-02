// Módulos externos
const select = require('@inquirer/select').default
const input = require('@inquirer/input').default
const chalk = require('chalk')

// Módulos internos
const fs = require('fs')

operation()

async function operation() {
    const answer = await select(
        {
            message: 'O que você deseja fazer?',
            choices: [
                {name: 'Criar conta', value: 'criar'},
                {name: 'Consultar Saldo', value: 'saldo'},
                {name: 'Depositar', value: 'depositar'},
                {name: 'Sacar', value: 'sacar'},
                {name: 'Sair', value: 'sair'}
            ]
        }
    )

    if (answer == 'criar')
        createAccount()
    else if (answer === 'saldo')
        getAccountBalance()
    else if (answer === 'depositar')
        deposit()
    else if (answer === 'sacar')
        withdraw()
    else if (answer === 'sair') {
        console.log(chalk.bgBlue.black('Aplicação encerrada.'))
        process.exit()
    }
}

// Criação de conta
function createAccount() {
    console.log(chalk.bgGreen.black('Bem-vindo ao Banco'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    buildAccount()
}

async function buildAccount() {
    const accountName = await input(
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta:'
        }
    )

    console.info(accountName)

    if (!fs.existsSync('accounts'))
        fs.mkdirSync('accounts')

    if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
            chalk.bgRed.black('Esta conta já existe, use outro nome.')
        )
        return buildAccount()
    }

    fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (err) => {
        console.log(err)
    })

    console.log(chalk.green('A conta ' + accountName + ' foi cadastrada com sucesso.'))
    operation()
}

// Deposito na conta
async function deposit() {
    const accountName = await input(
        {
            name: 'accountName',
            message: 'Digite o nome da sua conta:'
        }
    )

    // Verifica se a conta existe
    if (!checkAccount(accountName))
        return deposit()

    const amount = await input(
        {
            name: 'amount',
            message: 'Valor total a ser depositado:'
        }
    )

    addAmount(accountName, amount)
    operation()
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe.'))
        return false
    }
    return true
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(
            chalk.bgRed.black('O valor do depósito não foi recebido ou não informado.')
        )
        return deposit()
    }

    accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), err => {
        console.log(err)
    })

    console.log(chalk.green('Depósito efetuado com sucesso.'))
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

// Exibe o saldo da conta - Sem uso de operações assíncronas neste caso
function getAccountBalance() {
    input(
        {
            name: 'accountName',
            message: 'Digite o nome da sua conta:'
        }
    ).then(accountName => {
        if (!checkAccount(accountName))
            return getAccountBalance()

        const accountData = getAccount(accountName)
        console.log(chalk.bgBlue.black(`Seu saldo é: R$${accountData.balance}`))
        operation()
    }).catch(err => console.log(err))
}

// Realiza o saque da conta
async function withdraw() {
    const accountName = await input(
        {
            name: 'accountName',
            message: 'Digite o nome da sua conta:'
        }
    ).catch(err => console.log(err))

    if (!checkAccount(accountName))
        return withdraw()
    
    const amount = await input(
        {
            name: 'amount',
            message: 'Valor total a ser sacado:'
        }
    ).catch(err => console.log(err))

    removeAmount(accountName, amount)
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(
            chalk.bgRed.black('O valor do saque não foi recebido ou não informado.')
        )
        return withdraw()
    }
    
    if (accountData.balance < amount) {
        console.log(
            chalk.bgRed.black('O valor do sque é indisponível na conta.')
        )
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), err => {
        console.log(err)
    })
    console.log(chalk.green(`O saque no valor de R$${amount} foi efetuado.`))

    operation()
}