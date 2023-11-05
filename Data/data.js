import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = async() =>{
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: 'Course_Wave'
        })
     console.log("Database connected successfully.")
    } catch (error) {
        console.log(error)
    }
}

export default connectToMongo