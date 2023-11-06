import { User } from "../Models/user.js";
import { Course } from "../Models/course.js";
import { Lecture } from "../Models/lecture.js";
import catchAsyncError from "../Middlewares/catchAsyncError.js";
import customError from "../Utils/customError.js";
import getDataUri from "../Utils/dataUri.js";
import cloudinary from 'cloudinary'


export const createCourse = catchAsyncError(async(req, res, next)=>{

    let {title, overview, price} = req.body

    if(!title || !overview || !price)
    return next(new customError("Please fill all details", 400))

    const file = req.file;
    let myCloud;
    if(file) {

        if (file.size > 10*1024*1024) 
        return next(new customError('Maximum file size is 10 MB', 400))

        const fileUri = await getDataUri(file)

        myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
            folder: "Course_Poster"
        })
      }

      const course = await Course.create({
        title,
        description:{
            overview,
            price,
        },
        poster:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        },
        owner: req.user
     }) 
     
     const userId = req.user
     let user = await User.findById(userId)
     
        user.mycourse.unshift(course._id)
        user.save()
        
     res.status(201).json({
        success: true,
        message:"Yay! Course Created"
     })
})


export const editCourse = catchAsyncError(async(req, res, next)=>{
     
    const course = await Course.findById(req.params.courseId)
    if(!course) return next(new customError("Course not found", 404))

    const {title, overview, price} = req.body
    if(title || overview || price){
        course.title = title,
        course.description = {
            overview,
            price,
        }
    }

    const file = req.file
    if(file){
        if(course.poster && course.poster.public_id){
            await cloudinary.v2.uploader.destroy(course.poster.public_id)
        }
        
        const fileUri = await getDataUri(file)
        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
            folder: "Course_Poster"
        })
      
        course.poster = {
             public_id: myCloud.public_id,
             url: myCloud.secure_url
        }
    }

     await course.save()
     res.status(200).json({
        success: true,
        message: "Course Updated"
     })
})

export const addToCart = catchAsyncError(async(req, res, next) =>{
    
    let course = await Course.findById(req.params.courseId);
    if(!course) return next(new customError("Course not found", 404))

    let user = await User.findById(req.user)

    const isAdded = user.cart.includes(course._id)

    if(isAdded) {
        user.cart = user.cart.filter((addedCourseId)=> addedCourseId.toString() !== course._id.toString())
    } else {
        user.cart.push(course._id)
    }

    await user.save()

    res.status(200).json({
        success: true,
        message: isAdded ? "Removed from cart" : "Added to cart"
     })
})


export const addReview = catchAsyncError(async(req, res, next)=>{
    
      const {review, rating} = req.body
      let course = await Course.findById(req.params.courseId)
      if(!course) next(new customError("Course not found", 404))

      course.reviews = [
         {
            user: req.user,
            review,
            rating
         }
      ]

      await course.save()

      res.status(200).json({
        success: true,
        message: "Review posted"
      })
})

// export const deleteReview = catchAsyncError(async(req, res, next)=>{
      
//     let course = await Course.findById(req.params.courseId)
//     if(!course) next(new customError("Course not found", 404))



// })