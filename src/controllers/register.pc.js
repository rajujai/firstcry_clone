const express = require("express");
const bodyParser = require('body-parser');
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/user.model");
const urlencodedParser = bodyParser.urlencoded({extended:false});

router.get("", (req,res)=>{
    try{
    res.render("register",{
        alert:null,
        msg:null
    });
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.post("", urlencodedParser, [
    check("name", "Please enter Your Full Name")
    .isLength({min:3}),
    check("mobile", "Please enter Mobile No.")
    .isLength({min:1}),
    check("email", "Please enter Email ID")
    .isLength({min:3})
    .isEmail()
    .normalizeEmail(),
    check("password", "Please enter valid Password")
    .isLength({min:8})
], async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const alert = errors.array();
            res.render("register", {
                alert,
                msg:null
            })
        }else{
            try{
                let userEmail = req.body.email;
                const user = await User.find({email:userEmail}).lean().exec()
                if(user.length>0){
                        res.render("register",{
                        alert:null,
                        msg:`Welcome back ${user[0].name}, you are already registered.`
                    });
                }else{
                    const user = await User.create(req.body);
                    res.render("login",{
                        alert:null,
                        msg:null
                    });
                    res.send(user)
                }
                
            }
            catch(err){
                res.status(400).send(err.message);
            }
        }
})

module.exports = router;