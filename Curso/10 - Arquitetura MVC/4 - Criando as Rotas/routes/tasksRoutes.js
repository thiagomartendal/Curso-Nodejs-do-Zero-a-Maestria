import { Router } from 'express'
import TaskController from '../controllers/TaskController.js'

const router = Router()

router.get('/', TaskController.showTasks)
router.get('/add', TaskController.createTask)

export {router as tasksRouter}