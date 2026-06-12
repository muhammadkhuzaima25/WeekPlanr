import { Router } from 'express'
import { triggerArchive } from '../controllers/archiveController.js'

const router = Router()

router.post('/auto-archive', triggerArchive)

export default router
