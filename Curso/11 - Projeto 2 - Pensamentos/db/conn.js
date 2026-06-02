import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    'pensamentos',
    '',// Nome de usuário do mysql
    '', // Senha do mysql
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

try {
    sequelize.authenticate()
} catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error)
}

export default sequelize
