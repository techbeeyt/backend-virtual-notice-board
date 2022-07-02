const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/registration", userController.createUser);
router.post("/login", userController.authUser);


module.exports = router;