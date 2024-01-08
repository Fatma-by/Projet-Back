const express = require("express");
const router = express.Router();

const cloudinaryController = require("../controllers/cloudinary.controller");

router.post("/upload", cloudinaryController);

module.exports = router;
