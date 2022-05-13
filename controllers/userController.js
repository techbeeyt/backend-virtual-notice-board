const mysqlConnection = require("../models/db_connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
            console.log({
                roll,
                full_name,
                email,
                password,
                series,
                department,
                section,
            });
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

const auth_user = (req, res) => {
    const { email, password } = req.body;
    const qry = `SELECT password FROM students WHERE email = '${email}'`;
    mysqlConnection.query(qry, async(err, result) => {
        if (err) console.log(err);
        await bcrypt.compare(password, result[0].password, (err, res_2) => {
            if (err) {
                console.log(err);
            } else {
                if (res_2) {
                    res.send({ message: "User autheticated" });
                } else {
                    res.send({ message: "Invalid Credentials" });
                }
            }
        });
    });
};

module.exports = {
    get_all_user,
    create_new_user,
    auth_user,
};