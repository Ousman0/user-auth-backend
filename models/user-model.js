const mongoose = require("mongoose")

// model-schema for users
const userSchema = new mongoose.Schema({
userName:{
    type: String,
    require:true
},
email:{
    type: String,
    require:true,
    unique:true
},
userId:{
    type: Number,
    require:true
},
password:{
    type: String,
    require:true
},
})


const user = mongoose.model("User",userSchema)

module.exports = user