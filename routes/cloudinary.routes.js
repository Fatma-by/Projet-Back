const express = require("express");
const router = express.Router();

router.post("/upload", require("../controllers/cloudinary.controller"));

module.exports = router;
