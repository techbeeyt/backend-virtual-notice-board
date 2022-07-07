const express = require("express");
const router = express.Router();
const { PERMISSION } = require("../config/permission.config");
const authUser = require("../middlewares/auth.user");
const authOwn = require("../middlewares/auth.own");
const authAdmin = require("../middlewares/auth.admin");
const userController = require("../controllers/user.controller");

router.post("/registration", userController.createUser);
router.post("/login", userController.authUser);
router.post("/update-info", authUser(), authOwn(), userController.updateUser);
router.post("/delete-user", authUser(), authAdmin(PERMISSION.WRITE), userController.deleteUser);
router.get("/admin", authUser(), userController.isAdmin);

module.exports = router;