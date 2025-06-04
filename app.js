require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const errorMiddleware = require("./middleware/error.middleware");
const usermiddleware = require('./middleware/usermiddleware');

const app = express()

// Middlewares
app.use(express.json())
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(fileUpload()) 

// Router
app.use("/static",express.static("static"))
app.use("/files", express.static("files"))
app.use("/api",require("./routes/index"))
// Error handling

// Error handling
app.use(errorMiddleware)


const bootstrap = async()=>{
    try {
        const PORT=process.env.PORT || 8000
        await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Connect to MD"))
        app.listen(PORT,  ()=>{console.log(`Server running on Port ${PORT}`)})
    } catch (error) {
        console.log(error)
    }
}
bootstrap()