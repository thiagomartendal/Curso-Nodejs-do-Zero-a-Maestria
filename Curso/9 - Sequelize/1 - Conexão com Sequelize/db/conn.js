import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    'nodesequelize',
    '', // Nome de usuário do mysql
    '', // Senha do mysql
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

try {
    sequelize.authenticate()
    console.log('Banco de dados conectado')
} catch (err) {
    console.error('Erro ao se conectar ao banco de dados:', err)
}

export default sequelize
