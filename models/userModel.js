const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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

userSchema.pre('save', function(next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        return next();
    }
})

userSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    })
}

const Users = mongoose.model('Users', userSchema);

module.exports = Users;