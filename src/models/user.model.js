const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name:{type:String, required:true},
    mobile:{type:Number, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    address:{type:String, required:false}
},{
    versionKey:false,
    timestamps:true
})

const User = mongoose.model("user", schema);
module.exports = User;