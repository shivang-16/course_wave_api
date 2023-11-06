import express from 'express'
import { createLecture, editLecture, deleteLecture } from '../Controllers/lectureController.js'
import { isAuthenticated } from '../Middlewares/auth.js'
import { authoriseAdmin } from '../Middlewares/auth.js'
import singleUpload from '../Middlewares/multer.js'

const router = express.Router()

router.post('/create/:courseId', isAuthenticated, authoriseAdmin, singleUpload, createLecture)
router
     .route('/:lectureId')
     .patch(isAuthenticated, authoriseAdmin, editLecture)
     .delete(isAuthenticated, authoriseAdmin, deleteLecture)

export default router