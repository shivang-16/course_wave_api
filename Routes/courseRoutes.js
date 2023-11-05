import express from 'express'
import { createCourse, addToCart } from '../Controllers/courseController.js'
import singleUpload from '../Middlewares/multer.js'
import {isAuthenticated} from '../Middlewares/auth.js'
import { authoriseAdmin } from '../Middlewares/auth.js'


const router = express.Router()

//admin protected route
router.post('/create', isAuthenticated, authoriseAdmin, singleUpload, createCourse)

router.get('/:id', isAuthenticated, addToCart)

export default router