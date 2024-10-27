const mongoose = require("mongoose")

// function to connect to Db
const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("conect to mongoDb sucessful")
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1)
    }
}


module.exports = connectDb