const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminListSchema = new Schema({
    adminID: {
        type: String,
        required: true,
    },
    permissions: {
        read: Boolean,
        write: Boolean,
    }
})


const AdminList = mongoose.model('AdminList', adminListSchema);


module.exports = AdminList;