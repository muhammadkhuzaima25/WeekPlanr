import { Router } from 'express'
import { getWeekSchedule, generateSchedule, aiSchedule } from '../controllers/scheduleController.js'
import protect from '../middleware/authMiddleware.js'

const router = Router()

router.use(protect)

router.get('/week', getWeekSchedule)
router.post('/generate', generateSchedule)
router.post('/ai', aiSchedule)

export default router
