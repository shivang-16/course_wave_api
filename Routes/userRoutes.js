import express from 'express'
import { register, verifyOtp, login, logout, getMyProfile, editProfile, followUser } from '../Controllers/userController.js'
import {isAuthenticated} from '../Middlewares/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/verify', verifyOtp)
router.post('/login', login) 
router.get('/logout', logout)
router.get('/me', isAuthenticated, getMyProfile)
router.patch('/edit', isAuthenticated, editProfile)
router.get('/follow/:id', isAuthenticated, followUser)

export default router 