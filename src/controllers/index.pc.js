const express = require("express");
const router = express.Router();
const image = require("../models/image.model");

router.get("", async (req,res)=>{
    let images = await image.find().lean().exec();
    try{
    res.render("index",{
        images:images
    });
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = router;