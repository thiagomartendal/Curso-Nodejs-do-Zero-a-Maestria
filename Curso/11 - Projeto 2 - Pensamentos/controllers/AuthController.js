import bcrypt from 'bcryptjs'
import User from '../models/User.js'

class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async loginPost(req, res) {
        const {email, password} = req.body

        // Checa se o email está cadastrado
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            req.flash('message', 'O email informado não está registrado.')
            req.session.save(() => res.redirect('/'))
            return
        }

        // Checa se a senha está correta
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch) {
            req.flash('message', 'A senha informada não está correta.')
            req.session.save(() => res.redirect('/'))
            return
        }

        // Inicializa a sessão
        req.session.userid = user.id

        // Garante que a sesão seja salva
        req.session.save(() => res.redirect('/'))
    }

    static async registerPost(req, res) {
        const {name, email, password, confirmpassword} = req.body

        if (password != confirmpassword) {
            req.flash('message', 'As senhas informadas não são inguais.')
            req.session.save(() => res.redirect('/register'))
            return
        }

        // Checa se o usuário existe
        const checkIfUserExists = await User.findOne({where: {email: email}})

        if (checkIfUserExists) {
            req.flash('message', 'O email já está em uso.')
            req.session.save(() => res.redirect('/register'))
            return
        }

        // Criptografia da senha
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashPassword
        }

        try {
            const newUser = await User.create(user)

            // Inicializa a sessão
            req.session.userid = newUser.id

            req.flash('message', 'Cadastro concluído.')

            // Garante que a sesão seja salva
            req.session.save(() => res.redirect('/'))
        } catch (error) {
            console.error(error)
        }
    }
}

export default AuthController