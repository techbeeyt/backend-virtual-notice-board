const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    * This data can be accessed from multiple places
    * i. From particular course
    * ii. From Show all tasks
    ! expired should be true when due date passed .
    ! expired is need to be true, because after one year it should not come again . 
*/

const taskSchema = new Schema({
    associated_course: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    },
    task_title: {
        type: String,
        required: true,
    },
    task_description: String,
    series: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    expired: Boolean,
}, { timestamps: true });

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;