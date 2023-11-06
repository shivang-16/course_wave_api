import { Course } from "../Models/course.js";
import { Lecture } from "../Models/lecture.js";
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
    
    const lecture = await Lecture.create({
       title, description,
       video:{
        public_id: myCloud.public_id,
        url: myCloud.secure_url
       }
    })
     
    const course = await Course.findById(req.params.courseId)
    course.lectures.push(lecture._id)
    course.save()

    res.status(200).json({
        success: true,
        message: "Lecture added"
    })
})