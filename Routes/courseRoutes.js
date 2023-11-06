import express from 'express'
import { createCourse, editCourse, addToCart } from '../Controllers/courseController.js'
import singleUpload from '../Middlewares/multer.js'
import {isAuthenticated} from '../Middlewares/auth.js'
import { authoriseAdmin } from '../Middlewares/auth.js'


const router = express.Router()

//admin protected route
router.post('/create', isAuthenticated, authoriseAdmin, singleUpload, createCourse)
router.patch('/:courseId', isAuthenticated, authoriseAdmin, singleUpload, editCourse)
router.get('/:courseId', isAuthenticated, addToCart)

export default router