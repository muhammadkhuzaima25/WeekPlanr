import { Router } from 'express'
import { register, login, getMe, updateProfile } from '../controllers/authController.js'
import { googleAuth } from '../controllers/googleAuthController.js'
import protect from '../middleware/authMiddleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', googleAuth)
router.get('/me', protect, getMe)
router.put('/update', protect, updateProfile)

export default router
