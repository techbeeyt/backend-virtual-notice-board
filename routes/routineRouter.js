const express = require("express");
const router = express.Router();
const routineController = require("../controllers/routineController");

router.post("/my_routine", routineController.full_routine);
router.post("/add_class", routineController.add_class);
router.post("/get_by_id", routineController.get_by_id);
router.post("/get_by_day", routineController.get_by_day);

module.exports = router;