import { DataTypes } from 'sequelize'
import db from '../db/conn.js'

const User = db.define('User', {
    name: { // Nome do campo
        type: DataTypes.STRING, // Tipo de dado do campo
        allowNull: false // Rejeita valor nulo
    },
    occupation: {
        type: DataTypes.STRING,
        require: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN
    }
})

export default User