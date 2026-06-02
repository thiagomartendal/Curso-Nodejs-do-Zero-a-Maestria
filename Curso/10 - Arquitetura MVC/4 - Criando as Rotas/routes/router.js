import { Router } from 'express'
import { tasksRouter } from './tasksRoutes.js'

const router = Router()

// Atribuição das rotas definidas através de seus roteadores
router.use('/tasks', tasksRouter) // Rotas de tarefas

export default router