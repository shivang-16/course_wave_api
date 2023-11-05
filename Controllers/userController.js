import { User } from "../Models/user.js";
import { Course } from "../Models/course.js";
import customError from "../Utils/customError.js";
import catchAsyncError from "../Middlewares/catchAsyncError.js";
import sendMail from "../Utils/sendEmail.js";
import sendCookie from "../Utils/sendCookie.js";
import bcrypt from 'bcrypt'

let OTP, user;
export const register = catchAsyncError(async(req, res, next)=>{

    const {name, email, password } = req.body
    if(!name || !email || !password) 
    return next(new customError("Please enter all details", 400))

    let userEmail = await User.findOne({email});
    if (userEmail) return next(new customError("User already exists", 400));
    
    

    //sending otp 
    let digits = '0123456789';
    OTP = ''
    for(let i=0; i<6; i++){
        OTP += digits[Math.floor(Math.random()*10)]
    }
    
    await sendMail({
        email,
        subject: "Verification code - CourseWave",
        message: `Your verification code to register on CourseWave is ${OTP}`
    })

    //hashing password
     const hashedPassword = await bcrypt.hash(password, 10)

    user = new User({
        name,
        email, 
        password: hashedPassword,
        avatar: {
            public_id: "",
            url: "https://res.cloudinary.com/ddszevvis/image/upload/v1697807048/avatars/Default_Image_oz0haa.png",
          },
    })

    res.status(200).json({
        success: true,
        message: `Otp sent to your email`,
      });

})

export const verifyOtp = catchAsyncError(async(req, res, next)=>{
    const {otp} = req.body;
    if(otp != OTP) return next(new customError("Invalid OTP", 400))
    
   await user.save();
    
    sendCookie(user, res, 'Registered Successfully', 201)
})

export const login = catchAsyncError(async(req, res, next)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");
    if(!user) return next(new customError("User not found", 400))

    await bcrypt.compare(password, user.password)

    sendCookie(user, res, "Login Successfully", 200)
})

export const logout = (req, res) =>{
    res.status(200).cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: "Logout Successfull"
    })
}

export const getMyProfile = catchAsyncError(async(req, res, next)=>{

    const user = await User.findById(req.user);
    if(!user) next(new customError('User not found', 400))

    res.status(200).json({
        success: true,
        user,
    })
})