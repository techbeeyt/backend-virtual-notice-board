const express = require("express");
const { PERMISSION } = require("../config/permission.config");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const authAdmin = require("../middlewares/auth.admin");
const authUser = require("../middlewares/auth.user");

router.post("/add-new-task", authUser(), authAdmin(PERMISSION.WRITE), taskController.addNewTask);
router.get("/get-by-section", authUser(), taskController.getBySection);
router.post("/get-by-course-name", authUser(), taskController.getByCourseName);

module.exports = router;