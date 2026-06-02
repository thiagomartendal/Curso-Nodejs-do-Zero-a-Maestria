import Task from '../models/Task.js'

export default class TaskController {
    static showTasks(_, res) {
        res.render('tasks/all')
    }

    static createTask(_, res) {
        res.render('tasks/create')
    }

    static async createTaskSave(req, res) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }

        await Task.create(task)

        res.redirect('/tasks')
    }
}