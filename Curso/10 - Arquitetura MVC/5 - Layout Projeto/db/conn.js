import { Sequelize } from 'sequelize' 

const sequelize = new Sequelize(
    'nodemvc',
    '', // Nome de usuário do mysql
    '', // Senha do mysql
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

try {
    sequelize.authenticate()
} catch (error) {
    console.error(error)
}

export default sequelize
