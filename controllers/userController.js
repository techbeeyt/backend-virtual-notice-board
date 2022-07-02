const jwt = require('jwt-simple');
const Users = require("../models/userModel");

const createUser = async(req, res) => {
    const id = Date.now();
    const { full_name, email, password, roll, series, department, section } = req.body;

    const isExist = await Users.findOne({ $or: [{ email: email }, { roll: roll }] });
    if (isExist) {
        if (isExist.email === email) {
            res.send({ success: false, message: "This email already exists" });
        } else if (isExist.roll === roll) {
            res.send({ success: false, message: "This roll already exists" });
        }
    } else {
        const user = new Users({ id, full_name, email, roll, password, series, department, section });
        user.save()
            .then(result => {
                console.log(isExist);
                res.send({ success: true, message: "New user created successfully" });

            }).catch(err => {
                res.send({ success: false, message: err.message });
                console.log(err);
            });
    }

}

const authUser = async(req, res) => {
    Users.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user) res.send({ success: false, message: "This email is not registered" });
        else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.encode(user, process.env.SECRET);
                    res.send({ success: true, token: token });
                } else {
                    res.send({ success: false, message: "Incorrect Password", error: err });
                }
            })
        }
    })
}

module.exports = {
    createUser,
    authUser
};