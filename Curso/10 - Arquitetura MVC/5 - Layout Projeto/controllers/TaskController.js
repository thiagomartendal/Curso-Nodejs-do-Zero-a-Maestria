import Task from '../models/Task.js'

export default class TaskController {
    static showTasks(req, res) {
        res.render('tasks/all')
    }

    static createTask(req, res) {
        res.render('tasks/create')
    }
}