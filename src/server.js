const port = 1111;
const express = require("express");
const path = require("path");
const connect = require("./configs/db");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const userCont = require("./controllers/user.controller");

const registerCont = require("./controllers/register.pc");



app.use("/users", userCont);
app.use("/register", registerCont);

app.listen(port, async()=>{
    await connect();
    console.log(`Listening on port => ${port}`);
})