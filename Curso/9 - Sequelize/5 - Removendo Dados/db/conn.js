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

export default sequelize
