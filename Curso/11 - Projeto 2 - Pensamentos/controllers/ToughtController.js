import Tought from '../models/Tought.js'
import User from '../models/User.js'
import { Op } from 'sequelize'

class ToughtController {
    static async showToughts(req, res) {
        let search = ''

        if (req.query.search)
            search = req.query.search

        let order = ''

        if (req.query.order === 'old')
            order = 'ASC'
        else
            order = 'DESC'

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]]
        })

        const toughts = toughtsData.map((item) => item.get({plain: true}))
        let qty = toughts.length

        if (qty === 0)
            qty = false

        res.render('toughts/index', {toughts, search, qty})
    }

    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where: {id: userId},
            include: Tought,
            plain: true
        })

        // Checa se o usuário existed
        if (!user)
            res.redirect('/login')

        const toughts = user.Toughts.map((item) => item.dataValues)

        let emptyToughts = (toughts.length === 0)

        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async updateTought(req, res) {
        const id = req.params.id

        const tought = await Tought.findOne({where: {id: id}, raw: true})

        res.render('toughts/edit', {tought})
    }

    static async createToughtSave(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso.')

            req.session.save(() => res.redirect('/toughts/dashboard'))
        } catch (error) {
            console.error(error)
        }
    }

    static async removeTought(req, res) {
        const id = req.body.id
        const UserId = req.session.userid

        try {
            await Tought.destroy({where: {id: id, Userid: UserId}})

            req.flash('message', 'Pensamento removido com sucesso.')

            req.session.save(() => res.redirect('/toughts/dashboard'))
        } catch (error) {
            console.error(error)
        }
    }

    static async updateToughtSave(req, res) {
        const id = req.body.id
        const tought = {
            title: req.body.title
        }

        try {
            await Tought.update(tought, {where: {id: id}})

            req.flash('message', 'Pensamento atualizado com sucesso.')

            req.session.save(() => res.redirect('/toughts/dashboard'))
        } catch (error) {
            console.error(error)
        }
    }
}

export default ToughtController