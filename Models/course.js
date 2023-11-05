import { model } from "mongoose";
import { Schema } from "mongoose";

const courseSchema = new Schema({
    title:{
        type: String,
        required: [true,"Please enter the title of the course"]
    },
    description:{
        overview: String,
        price: Number,
    },
    poster:{
        public_id: String,
        url: String,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    enrollments:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    reviews:[
       {  
        user:{
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        review: String
    }
    ],

    likes:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    rating:[
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

export const Course = model("Course", courseSchema)