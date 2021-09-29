const mongoose = require("mongoose");
const password = `qiir6jICtvA8OzfL`;
const url = `mongodb+srv://firstcry:${password}@cluster0.hzew2.mongodb.net/firstcry?retryWrites=true&w=majority`;
const connect = ()=>{
    return mongoose.connect(url);
}

module.exports = connect;