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
    role:{
       type: String,
       enum: ["user", "admin"],
       default: "user"
    },
    playlist:[
    {  
        course:{
                type: Schema.Types.ObjectId,
                ref: "Course"
        },
        poster: String
    }
    ], 

    cart:[
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
         }
    ],
    
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

export const User = model("User", userSchema)