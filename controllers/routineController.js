const Routines = require("../models/routineModel");

const addNewClass = async(req, res) => {
    const { class_title, start_time, end_time, week_day, room_no, teacher_name, teacher_code, series, department, section } = req.body;
    if (class_title && start_time && end_time && week_day && room_no && teacher_name && teacher_code && series && department && section) {
        const newClass = new Routines({ class_title, start_time, end_time, week_day, room_no, teacher_name, teacher_code, series, department, section });
        await newClass.save()
            .then(result => res.send({ success: true, message: "Routine Updated" }))
            .catch(err => res.send({ success: false, message: err }));
    } else {
        res.send({ success: false, message: "No field can be empty" });
    }
}

const getByDay = async(req, res) => {
    const { week_day, department, series, section } = req.body;
    Routines.find({ $and: [{ week_day: week_day }, { department: department }, { series: series }, { section: section }] }, (err, result) => {
        if (err) throw err;
        if (!result) res.send({ success: false, message: "No class for today" });
        else {
            res.send({ success: true, count: `${result.length}`, routine: result });
        }
    })
}

module.exports = {
    addNewClass,
    getByDay
}