import express from "express";
import errorMiddleware from "./Middlewares/error.js";
import userRouter from './Routes/userRoutes.js'
import courseRouter from './Routes/courseRoutes.js'
import lectureRouter from './Routes/lectureRoutes.js'
import cookieParser from "cookie-parser";
import { config } from "dotenv";

export const app = express()

config({
    path: './config.env'
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/lecture', lectureRouter)

app.get('/', (req, res)=>{
    res.send("Server is working fine")
})

app.use(errorMiddleware);