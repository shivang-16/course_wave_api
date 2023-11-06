import { model } from "mongoose";
import { Schema } from "mongoose";

const courseSchema = new Schema({
    title:{
        type: String,
        required: [true,"Please enter the title of the course"]
    },
    description: String,
    video:{
        public_id: String,
        url: String,
    },
    course:{
         type:  Schema.Types.ObjectId,
         ref: "Course"
    },
    views:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    likes:[
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

export const Lecture = model("Lecture", courseSchema)