import { app } from "./app.js";
import connectToMongo from "./Data/data.js";

const port = process.env.PORT

connectToMongo()

app.listen(port , ()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})