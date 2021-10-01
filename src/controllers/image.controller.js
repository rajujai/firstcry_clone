const express = require("express");
const router = express.Router();
const crudController = require("./crud.controller");

const Image = require("../models/image.model");
router.get("", crudController(Image).get);
router.post("", crudController(Image).post);

module.exports = router;