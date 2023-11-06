import { Course } from "../Models/course.js";
import { Lecture } from "../Models/lecture.js";
import { User } from "../Models/user.js";
import catchAsyncError from "../Middlewares/catchAsyncError.js";
import customError from "../Utils/customError.js";
import getDataUri from "../Utils/dataUri.js";
import cloudinary from 'cloudinary'

export const createLecture = catchAsyncError(async(req, res, next)=>{
    

    const {title, description} = req.body

    if(!title) return next(new customError("Please enter title", 400))

    const file = req.file;
    let myCloud;
    if(file){
        const fileUri = await getDataUri(file)
    
        myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
            resource_type: 'video',
            folder: "course_wave_lecture"
        })
    }
    
    const course = await Course.findById(req.params.courseId)

    const lecture = await Lecture.create({
       title, description,
       video:{
        public_id: myCloud.public_id,
        url: myCloud.secure_url
       },
       course: course._id
    })
     
  
    course.lectures.push(lecture._id)
    course.save()

    res.status(201).json({
        success: true,
        message: "Lecture added"
    })
})

export const editLecture = catchAsyncError(async(req, res, next)=>{
     
    const lecture = await Lecture.findById(req.params.lectureId)
    if(!lecture) next(new customError("Lecture not found", 400))

    const {title, description} = req.body

    if(title) lecture.title = title
    if(description) lecture.description = description
   
    await lecture.save()
    res.status(200).json({
        success: true,
        message: "Lecture Details Updated"
    })
})

export const deleteLecture = catchAsyncError(async(req, res, next)=>{

    const lecture = await Lecture.findById(req.params.lectureId)
    if(!lecture) next(new customError("Lecture not found", 400))

    if(lecture.video && lecture.video.public_id){
        await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
            resource_type: "video"
        })
    }

    const course = await Course.findById(lecture.course._id)
    const index = course.lectures.indexOf(lecture._id)
    course.lectures.splice(index, 1);
    course.save()

    await lecture.deleteOne()
    res.status(200).json({
            success: true,
            message: "Lecture Deleted"
        })
})

export const likeLecture = catchAsyncError(async(req, res, next)=>{

    const lecture = await Lecture.findById(req.params.lectureId);
    if(!lecture) next(new customError("Lecture not found", 404))

    const user = await User.findById(req.user)

    const isLiked = lecture.likes.includes(user._id)
    if(isLiked){
        lecture.likes = lecture.likes.filter((likedUserId)=> likedUserId.toString() !== user._id.toString())
    } else {
        lecture.likes.unshift(user._id)
    }

    await lecture.save()
    res.status(200).json({
        success: true,
        message: isLiked ? "Lecture Unliked" : "Lecture Liked"
    })
})

export const getLecturebById = catchAsyncError(async(req, res, next)=>{
     
    const lecture = await Lecture.findById(req.params.lectureId)
    if(!lecture) next(new customError("Lecture not found", 404))

    const user = await User.findById(req.user)

    lecture.views.push(user._id)
    await lecture.save()

    res.status(200).json({
        success: true,
        message: 'New Viewer',
        lecture,
    })

})

