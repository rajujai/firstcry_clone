const express = require("express");
const bodyParser = require('body-parser');
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/user.model");
const urlencodedParser = bodyParser.urlencoded({extended:false});

router.get("", (req,res)=>{
    try{
    res.render("login",{
        alert:null,
        msg:null
    });
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.post("", urlencodedParser, [
    check("inp", "Please enter your Email ID or Mobile No.")
    .isLength({min:10})
], async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const alert = errors.array();
            res.render("login", {
                alert,
                msg:null
            })
        }else{
            try{
                let input = req.body.inp;
                let user;
                if(Number(input)){
                    user = await User.findOne({mobile:input}).lean().exec()
                }else{
                    user = await User.findOne({email:input}).lean().exec()
                }
                if(user){
                    console.log(user.email);
                    // localStorage.setItem("firstcryuser", JSON.stringify(user.email));
                    return res.redirect("/");
                }else{
                    return res.render("login",{
                        alert:null,
                        msg:"Please create your account first"
                    });
                }
            }catch(err){
                res.status(400).send(err);
            }
        }
})

module.exports = router;