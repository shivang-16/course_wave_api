import { model } from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Please enter the name"],
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Please enter the email"],
    },
    password:{
       type: String,
       required: [true, "Please enter the password"],
       select: false,
    },
    avatar:{
        public_id: String,
        url: String
    },
    description:{
        about: String,
        link: String,
    },
    role:{
       type: String,
       enum: ["user", "admin"],
       default: "user"
    },
    //for user
    playlist:[
        {
             type: Schema.Types.ObjectId,
             ref: "Course"
        }
    ], 
    cart:[
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
         }
    ],
    
    //for admin 
    mycourse: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
       }
    ],

    followers:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
         }
    ],

    following:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
         }
    ],
    
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

export const User = model("User", userSchema)