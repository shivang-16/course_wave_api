import { app } from "./app.js";
import connectToMongo from "./Data/data.js";
import cloudinary from 'cloudinary'

const port = process.env.PORT

connectToMongo()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.listen(port , ()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})