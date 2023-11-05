import jwt from 'jsonwebtoken'

const sendCookie = async(user, res, message, statusCode) =>{

     const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
     const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
     }

     await res
             .status(statusCode)
             .cookie("token", token , options)
             .json({
                success: true,
                message,
                user,
             })       
}

export default sendCookie