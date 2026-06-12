import { Router } from 'express'
import { register, login, getMe, updateProfile } from '../controllers/authController.js'
import { googleAuth } from '../controllers/googleAuthController.js'
import protect from '../middleware/authMiddleware.js'

const router = Router()

// Standard Email/Password Auth
router.post('/register', register)
router.post('/login', login)

// Google OAuth Endpoints (Supported for both API tokens and direct redirects)
router.post('/google', googleAuth)
router.get('/google', googleAuth) // Added GET handler to fix "Route not found" on direct browser redirects

// Protected User Profile Routes
router.get('/me', protect, getMe)
router.put('/update', protect, updateProfile)

export default router
