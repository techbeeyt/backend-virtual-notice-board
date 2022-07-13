const jwt = require('jwt-simple');
const Tasks = require('../models/task.model');

/*
    * Does: Add new task
    ! Accessed by: only ADMIN
 */

const addNewTask = async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const data = await jwt.decode(token, process.env.SECRET);

    const { series, department, section } = data;
    const { associated_course, due_date, task_title, task_description } = req.body;
    if (associated_course && due_date && task_title) {
        const newTask = new Tasks({ associated_course, due_date, task_title, task_description, series, department, section });
        newTask.save().then((result) => {
            res.send({ success: true, message: "New task added" });
        }).catch((err) => res.send({ success: false, message: err }));
    } else {
        res.send("All fields are required");
    }
}

/*
    * /GET method
    ! Accessed by: only Logged In users
*/

const getBySection = async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const data = await jwt.decode(token, process.env.SECRET);
    const { series, department, section } = data;

    Tasks.find({ $and: [{ series: series }, { department: department }, { section: section }] }, (err, result) => {
        res.send({ success: true, count: result.length, data: result });
    })
}

const getByCourseName = async(req, res) => {
    const { associated_course } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const data = await jwt.decode(token, process.env.SECRET);
    const { series, department, section } = data;

    Tasks.find({ $and: [{ associated_course: associated_course }, { series: series }, { department: department }, { section: section }] }, (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.send("No task found for this course");
        } else {
            res.send({ success: true, tasks: result });
        }
    })
}

module.exports = {
    addNewTask,
    getBySection,
    getByCourseName
};