import jwt from 'jsonwebtoken'
import customError from '../Utils/customError.js'
import { User } from '../Models/user.js'

const isAuthenticated = async(req, res, next) =>{
    
    const {token} = req.cookies
    if(!token) return next(new customError("Login into your account first", 400))

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id)
    next()
}

export default isAuthenticated