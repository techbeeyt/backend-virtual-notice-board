const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/userModel");

const createUser = async(req, res) => {
    const id = Date.now();
    const { full_name, email, password, roll, series, department, section } = req.body;

    const abc = await Users.findOne({ $or: [{ email: email }, { roll: roll }] });
    if (abc) {
        if (abc.email === email) {
            res.send({ success: false, message: "This email already exists" });
        }
        if (abc.roll === roll) {
            res.send({ success: false, message: "This roll already exists" });
        }
    } else {
        const hashedPasword = await bcrypt.hash(password, 12);
        const user = new Users({ id, full_name, email, roll, password: hashedPasword, series, department, section });

        user.save()
            .then(result => {
                console.log(abc);
                res.send({ success: true, message: "New user created successfully" });

            }).catch(err => {
                res.send({ success: false, message: err.message });
                console.log(err);
            });
    }

}

const authUser = async(req, res) => {
    const { email, password } = req.body;
    const matchUser = await Users.findOne({ email: email });
    if (matchUser) {
        console.log("auth--user_found")
        bcrypt.compare(password, matchUser.password, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result) {
                    console.log("auth--password_matched");
                    res.send({ success: true, message: "User Authenticated successfully", user: matchUser });
                } else {
                    console.log("auth--password_does_not_match")
                    res.send({ success: false, message: "Password does not match" });
                }
            }
        })
    } else {
        console.log("auth--user_not_found");
        res.send({ success: false, message: "This email is not registered" })
    }
}

module.exports = {
    createUser,
    authUser
};