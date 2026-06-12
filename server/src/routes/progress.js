import { Router } from 'express'
import { getStats } from '../controllers/progressController.js'
import protect from '../middleware/authMiddleware.js'

const router = Router()

router.use(protect)

router.get('/stats', getStats)

export default router
