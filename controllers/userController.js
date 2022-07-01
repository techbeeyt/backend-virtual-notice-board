const mysqlConnection = require("../models/db_connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/userModel");

const get_all_user = (req, res) => {
    const qry = "SELECT * FROM students";
    mysqlConnection.query(qry, (err, result) => {
        res.send(result);
    });
};

const create_new_user = (req, res) => {
    const { roll, full_name, email, password, series, department, section } =
    req.body;
    const check_roll_email = `SELECT roll, email FROM students WHERE roll='${roll}' or email='${email}'`;
    mysqlConnection.query(check_roll_email, async(err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            if (result[0].email == email) {
                res.send({
                    success: false,
                    message: "This email is already registered",
                });
            } else if (result[0].roll == roll) {
                res.json({
                    success: false,
                    message: "This roll is already registered",
                });
            }
        } else {
            const id = Date.now();
            const hashedPasword = await bcrypt.hash(password, 12);
            const create_user_query = `INSERT INTO students (id, roll, full_name, email, password, series, department, section) VALUES (${id}, ${roll}, '${full_name}', '${email}', '${hashedPasword}', '${series}', '${department}', '${section}')`;
            mysqlConnection.query(create_user_query, (err, result) => {
                if (err) throw err;
                else {
                    res.send({ success: true });
                }
            });
        }
    });
};

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
        console.log(matchUser)
        bcrypt.compare(password, matchUser.password, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ success: true, message: "User Authenticated successfully", user: matchUser });
            }
        })
    }
}

module.exports = {
    get_all_user,
    create_new_user,
    auth_user,
    createUser,
    authUser
};