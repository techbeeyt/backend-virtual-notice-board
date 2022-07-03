const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineSchema = new Schema({
    class_title: {
        type: String,
        required: true,
    },
    start_time: {
        type: String,
        required: true,
    },
    end_time: {
        type: String,
        required: true,
    },
    week_day: {
        type: String,
        required: true,
    },
    room_no: {
        type: String,
        required: true,
    },
    teacher_name: {
        type: String,
        required: true,
    },
    teacher_code: {
        type: String,
        required: true,
    },
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
    }
});

const Routines = mongoose.model('Routines', routineSchema);

module.exports = Routines;