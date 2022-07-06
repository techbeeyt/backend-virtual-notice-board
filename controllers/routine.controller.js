const jwt = require('jwt-simple');
const Routines = require("../models/routine.model");

/*
    * Does: Add new class
    ! Accessed by: only ADMIN
 */
const addNewClass = async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const data = await jwt.decode(token, process.env.SECRET);
    const { series, department, section } = data;
    const { course_code, class_title, start_time, end_time, week_day, room_no, teacher_name, teacher_code } = req.body;
    if (!series || !department || !section) {
        /*
         * if somehow token is not valid
         */
        res.send({ success: false, message: "Forbidden!" })
    } else if (course_code && class_title && start_time && end_time && week_day && room_no && teacher_name && teacher_code) {
        const newClass = new Routines({ course_code, class_title, start_time, end_time, week_day, room_no, teacher_name, teacher_code, series, department, section });
        await newClass.save()
            .then(result => res.send({ success: true, message: "Routine Updated" }))
            .catch(err => res.send({ success: false, message: err }));
    } else {
        res.send({ success: false, message: "No field can be empty" });
    }
}

/* 
 * Get data on basis of [week_day]...
 */

const getByDay = async(req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.decode(token, process.env.SECRET);
        const today = new Date().getDay();
        const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const { department, series, section } = user;
        Routines.find({ $and: [{ week_day: weekDay[today] }, { department: department }, { series: series }, { section: section }] }, (err, result) => {
            if (err) throw err;
            if (result.length === 0) res.send({ success: false, message: "No class for today" });
            else {
                res.send({ success: true, count: result.length, routine: result });
            }
        })
    }
    /*
     * does: Provide all classes list of a section
     */
const getBySection = async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.decode(token, process.env.SECRET);
    const { department, series, section } = user;
    Routines.find({ $and: [{ department: department }, { series: series }, { section: section }] }, (err, result) => {
        if (err) throw err;
        if (result.length === 0) res.send({ success: false, message: "No class found . Please, add some class first" });
        else {
            res.send({ success: true, count: `${result.length}`, routine: result });
        }
    })
}


/*
 * gives Class Data by ID
 ! accessed by: only ADMIN
 */

const getByID = async(req, res) => {
    const { id } = req.body;
    Routines.findOne({ _id: id }, (err, result) => {
        if (err) throw err;
        if (!result) {
            res.send({ success: false, message: "No class found with this ID" });
        } else {
            res.send({ success: false, message: result });
        }
    })
}

/*
    * /POST method
    ! accessed by: ADMIN
*/

const updateRoutine = (req, res) => {
    const { id } = req.body;
    Routines.updateOne({ _id: id }, { $set: { "course_code": course_code, "class_title": class_title, "start_time": start_time, "end_time": end_time, "week_day": week_day, "room_no": room_no, "teacher_name": teacher_name, "teacher_code": teacher_code } }, (err, result) => {
        if (err) throw err
        else {
            res.send({ success: true, message: result })
        }
    })
}

/*
    * /POST method
    ! accessed by: ADMIN
*/

const deleteRoutine = (req, res) => {
    const { id } = req.body;
    Routines.deleteOne({ _id: id }, (err, result) => {
        if (err) throw err;
        else res.send({ success: true, message: result })
    })
}

module.exports = {
    addNewClass,
    getByDay,
    getBySection,
    getByID,
    updateRoutine,
    deleteRoutine
}