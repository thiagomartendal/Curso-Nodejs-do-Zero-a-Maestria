import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import token from '../helpers/token.js'

function inputValidation(res, inputsData, edit = false) {
    // Verifica se o campo de nome foi preenchido
    if (!inputsData.name)
        return 'O nome de usuário não foi informado.'

    // Verifica se o campo de email foi preenchido
    if (!inputsData.email)
        return 'O email de usuário não foi informado.'

    // Verifica se o campo de telefone foi preenchido
    if (!inputsData.phone)
        return 'O número de telefone de usuário não foi informado.'

    // Verifica se o campo de senha foi preenchido
    if (!inputsData.password && !edit)
        return 'A senha não foi informada.'

    // Verifica se o campo da confirmação de senha foi preenchido
    if (!inputsData.confirmpassword && !edit)
        return 'A confirmação de senha não foi informada.'

    return null
}

function passwordValidation(res, password, confirmpassword) {
    // Verifica se a senha e a confirmação de senha informadas são iguais
    return ((password !== confirmpassword) ? 'A senha e a confirmação de senha não são iguais.' : null)
}

// Funções de rotas GET

async function checkUser(req, res) {
    let currentUser = null

    const tk = req.signedCookies.valid
    const decoded = jwt.verify(tk, 'segredoparaotoken')

    currentUser = await User.findById(decoded.id)
    currentUser.password = undefined

    res.status(200).send(currentUser)
}

async function getUserById(req, res) {
    const id = req.params.id
    const user = await User.findById(id).select('-password')

    // Verifica se o usuário foi encontrado
    if (!user)
        return res.status(422).json({message: 'O usuário não foi encontrado.'})

    res.status(200).json(user)
}

// Funções de rotas POST

async function register(req, res) {
    const {name, email, phone, password, confirmpassword} = req.body

    // Validação dos campos
    const msgInputValidation = inputValidation(res, req.body)
    if (msgInputValidation)
        return res.status(422).json({message: msgInputValidation})

    // Verifica se a senha e a confirmação de senha conferem
    const msgPasswordValidation = passwordValidation(res, password, confirmpassword)
    if (msgPasswordValidation)
        return res.status(422).json({message: msgPasswordValidation})

    // Verifica se o email de usuário a ser registrado já existe
    const checkEmail = await User.findOne({email: email})
    if (checkEmail)
        return res.status(422).json({message: 'O email ' + email + ' já está em uso.'})

    // Criptografa a senha
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)

    // Dados do usuario
    const user = new User({
        name: name,
        email: email,
        phone: phone,
        password: hash
    })

    try {
        const newUser = await user.save()
        await token.createUserToken(newUser, req, res)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error})
    }
}

async function login(req, res) {
    const {email, password} = req.body

    // Verifica se o campo de email foi preenchido
    if (!email)
        return res.status(422).json({message: 'O email de usuário não foi informado.'})

    // Verifica se o campo de senha foi preenchido
    if (!password)
        return res.status(422).json({message: 'A senha não foi informada.'})

    // Busca o usuário do email informado
    const user = await User.findOne({email: email})
    if (!user)
        return res.status(422).json({message: 'O email ' + email + ' não está cadastrado.'})

    // Compara as senhas
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword)
        return res.status(422).json({message: 'Senha inválida.'})

    await token.createUserToken(user, req, res)
}

function logout(req, res) {
    res.clearCookie('valid', {
        httpOnly: true,
        sameSite: 'Lax',
        path: '/'
    })

    res.sendStatus(200)
}

function checkauth(req, res) {
    const tk = req.signedCookies.valid

    if (!tk)
        return res.status(200).send({auth: false})

    const decoded = jwt.verify(tk, 'segredoparaotoken')

    if (decoded)
        res.status(200).send({auth: true, userId: decoded.id})
    else
        res.status(401).send({auth: false, userId: null})
}

// Funções de rotas PATCH

async function editUser(req, res) {
    const id = req.params.id
    const {name, email, phone, password, confirmpassword} = req.body

    // Verifica se o usuário existe
    const tk = req.signedCookies.valid
    const user = await token.getUserByToken(tk)
    if (!user)
        return res.status(422).json({message: 'Usuário não encontrado.'})

    // Atribui o nome do arquivo de imagem caso tenha sido enviado
    if (req.file) // Verifica se foi enviado um arquivo
        user.image = req.file.filename

    // Validação dos campos
    const msgInputValidation = inputValidation(res, req.body, true)
    if (msgInputValidation)
        return res.status(422).json({message: msgInputValidation})

    // Verifica se o email de usuário está registrado existe
    const checkEmail = await User.findOne({email: email})
    if (checkEmail && user.email !== email)
        return res.status(422).json({message: 'O email ' + email + ' não pertence ao usuário.'})

    // Verifica se a senha e a confirmação de senha conferem
    const msgPasswordValidation = passwordValidation(res, password, confirmpassword)
    if (msgPasswordValidation)
        return res.status(422).json({message: msgPasswordValidation})
    else if (!msgPasswordValidation && password != null) {
        // Criptografa a nova senha
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password, salt)
        user.password = hash
    }

    user.name = name
    user.email = email
    user.phone = phone

    try {
        // Atualiza os dados no banco
        await User.findOneAndUpdate({_id: user._id}, {$set: user}, {
            returnDocument: 'after',
            runValidators: true
        })

        res.status(200).json({message: 'Os dados foram atualizados.'})
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

export default {checkUser, getUserById, register, login, logout, checkauth, editUser}