const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.get_all_user);
router.post("/registration_old", userController.create_new_user);
router.post("/login", userController.auth_user);
router.post("/registration", userController.createUser);

module.exports = router;