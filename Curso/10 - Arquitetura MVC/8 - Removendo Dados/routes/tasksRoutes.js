import { Router } from 'express'
import TaskController from '../controllers/TaskController.js'

const router = Router()

// Rotas GET
router.get('/', TaskController.showTasks)
router.get('/add', TaskController.createTask)

// Rotas POST
router.post('/add', TaskController.createTaskSave)
router.post('/remove', TaskController.removeTask)

export {router as tasksRouter}