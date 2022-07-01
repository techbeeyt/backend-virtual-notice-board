const mysqlConnection = require("../models/db_connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/userModel");


const auth_user = async(req, res) => {
    const { email, password } = req.body;
    const qry = `SELECT password FROM students WHERE email = '${email}'`;
    const qry_full_user = `SELECT * FROM students WHERE email = '${email}'`;
    mysqlConnection.query(qry, async(err, result) => {
        if (err) console.log(err);
        if (result.length == 0) {
            res.send({ success: false, message: "Invalid Credentials" });
            return;
        }
        bcrypt.compare(password, result[0].password, (err, res_2) => {
            if (err) {
                console.log(err);
            } else {
                if (res_2) {
                    mysqlConnection.query(qry_full_user, async(err, result_2) => {
                        res.send({
                            success: true,
                            message: "User autheticated",
                            user: result_2,
                        });
                    });
                } else {
                    console.log("User failed");
                    res.send({ success: false, message: "Wrong password!" });
                }
            }
        });
    });
};


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
    }
}

module.exports = {
    auth_user,
    createUser,
    authUser
};