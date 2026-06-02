import jwt from 'jsonwebtoken'
import User from '../models/User.js'

async function createUserToken(user, req, res) {
    // Cria o token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, 'segredoparaotoken')

    res.cookie('valid', token, {
        httpOnly: true,
        sameSite: 'Lax',
        secure: true,
        signed: true, // Utiliza um segredo para assinar o cookie
        path: '/'
    })

    res.status(200).json({
        message: 'Você está autenticado.',
        token: token,
        userId: user._id
    })
}

// Middleware de validação do token
function checkToken(req, res, next) {
    const token = req.signedCookies.valid

    if (!token)
        return res.status(401).json({message: 'Acesso negado.'})

    try {
        const verified = jwt.verify(token, 'segredoparaotoken')
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({message: 'Token inválido.'})
    }
}

async function getUserByToken(token) {
    if (!token)
        return res.status(401).json({message: 'Acesso negado.'})
    
    const decoded = jwt.verify(token, 'segredoparaotoken')
    const userId = decoded.id
    const user = await User.findOne({_id: userId})

    return user
}

export default {createUserToken, checkToken, getUserByToken}