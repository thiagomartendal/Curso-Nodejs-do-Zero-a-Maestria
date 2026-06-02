import mysql from 'mysql'

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: '', // Nome de usuário do mysql
    password: '', // Senha do mysql
    database: 'nodemysql'
})

export default pool
