import { Router } from 'express'
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../controllers/subjectController.js'
import protect from '../middleware/authMiddleware.js'

const router = Router()

router.use(protect)

router.get('/', getSubjects)
router.post('/', createSubject)
router.put('/:id', updateSubject)
router.delete('/:id', deleteSubject)

export default router
