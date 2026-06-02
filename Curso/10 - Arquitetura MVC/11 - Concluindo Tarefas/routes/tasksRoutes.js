import { Router } from 'express'
import TaskController from '../controllers/TaskController.js'

const router = Router()

// Rotas GET
router.get('/', TaskController.showTasks)
router.get('/add', TaskController.createTask)
router.get('/edit/:id', TaskController.updateTask)

// Rotas POST
router.post('/add', TaskController.createTaskSave)
router.post('/remove', TaskController.removeTask)
router.post('/edit', TaskController.updateTaskPost)
router.post('/updateStatus', TaskController.toggleTaskStatus)

export {router as tasksRouter}