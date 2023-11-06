import express from 'express'
import { createLecture, editLecture, deleteLecture, likeLecture, getLecturebById } from '../Controllers/lectureController.js'
import { isAuthenticated } from '../Middlewares/auth.js'
import { authoriseAdmin } from '../Middlewares/auth.js'
import singleUpload from '../Middlewares/multer.js'

const router = express.Router()

router.post('/create/:courseId', isAuthenticated, authoriseAdmin, singleUpload, createLecture)
router
     .route('/:lectureId')
     .get(isAuthenticated, getLecturebById)
     .patch(isAuthenticated, authoriseAdmin, editLecture)
     .delete(isAuthenticated, authoriseAdmin, deleteLecture)
 router.get('/like/:lectureId', isAuthenticated, likeLecture)    

export default router