const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    roll: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
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
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;