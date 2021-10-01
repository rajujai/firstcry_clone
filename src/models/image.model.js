const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    img:{type:String, required:true}
},{
    versionKey:false
})

const Image = mongoose.model("homepage-image", schema);
module.exports = Image;