import express from 'express'
import { createCourse, editCourse, addToCart, addReview } from '../Controllers/courseController.js'
import singleUpload from '../Middlewares/multer.js'
import {isAuthenticated} from '../Middlewares/auth.js'
import { authoriseAdmin } from '../Middlewares/auth.js'


const router = express.Router()

//admin protected route
router.post('/create', isAuthenticated, authoriseAdmin, singleUpload, createCourse)
router
      .route('/:courseId')
      .patch(isAuthenticated, authoriseAdmin, singleUpload, editCourse)
      .get(isAuthenticated, addToCart)
      .post(isAuthenticated, addReview)

export default router