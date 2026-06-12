import { Router } from 'express'
import { getTasks, createTask, updateTask, deleteTask, clearWeek } from '../controllers/taskController.js'
import protect from '../middleware/authMiddleware.js'

const router = Router()

router.use(protect)

router.get('/', getTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/clear-week', clearWeek)
router.delete('/:id', deleteTask)

export default router
