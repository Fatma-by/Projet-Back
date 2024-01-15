const express = require("express");
const router = express.Router();

const cloudinaryController = require("../controllers/cloudinary.controller");


router.post("/upload", cloudinaryController.createRessource);
router.post("/getRessources", cloudinaryController.getRessources);


module.exports = router;
