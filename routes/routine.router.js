const express = require("express");
const router = express.Router();
const routineController = require("../controllers/routine.controller");
const authAdmin = require('../middlewares/auth.admin');
const authUser = require('../middlewares/auth.user');
const { PERMISSION } = require('../config/permission.config');

router.post('/add-new-class', authUser(), authAdmin(PERMISSION.WRITE), routineController.addNewClass);
router.post('/get-by-day', authUser(), routineController.getByDay);
router.post('/get-by-section', authUser(), routineController.getBySection);
router.post('/get-by-id', authUser(), routineController.getByID);
router.post('/update-by-id', authUser(), authAdmin(PERMISSION.WRITE), routineController.updateRoutine);
router.post('/delete-by-id', authUser(), authAdmin(PERMISSION.WRITE), routineController.deleteRoutine);

module.exports = router;