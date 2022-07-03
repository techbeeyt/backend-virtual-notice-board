const express = require("express");
const router = express.Router();
const routineController = require("../controllers/routineController");
const Routines = require("../models/routineModel");

router.post('/add-new-class', routineController.addNewClass);
router.post('/get-by-day', routineController.getByDay);


module.exports = router;