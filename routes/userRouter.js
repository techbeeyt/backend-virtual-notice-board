const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.get_all_user);
router.post("/registration_old", userController.create_new_user);
router.post("/login_old", userController.auth_user);
router.post("/registration", userController.createUser);
router.post("/login", userController.authUser);


module.exports = router;