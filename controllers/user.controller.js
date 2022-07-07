const jwt = require('jwt-simple');
const Users = require("../models/user.model");
const Admins = require("../models/adminList");

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
            .then((result) => {
                res.send({ success: true, message: "New user created successfully" });

            }).catch(err => {
                res.send({ success: false, message: err.message });
                console.log(err);
            });
    }

}

const getUserInfo = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const data = jwt.decode(token, process.env.SECRET);
    Users.findOne({ _id: data._id }, (err, user) => {
        if (err) throw err;
        else {
            res.send({ success: true, data: user });
        }
    })
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
                    const userInfo = {
                        full_name: user.full_name,
                        email: user.email,
                        roll: user.roll
                    }
                    console.log(userInfo);

                    var token = jwt.encode(user, process.env.SECRET);
                    res.send({ success: true, token: token, data: userInfo });
                } else {
                    res.send({ success: false, message: "Incorrect Password", error: err });
                }
            })
        }
    })
}

/*
    * does: Updates Particular Users Data
    ! accessed by: only [Logged In User]
*/

const updateUser = async(req, res) => {
    const { id, full_name, email, password, roll, series, department, section } = req.body;
    Users.updateOne({ _id: id }, { $set: { "full_name": full_name, "email": email, "password": password, "roll": roll, "series": series, "department": department, "section": section } }, (err, result) => {
        if (err) throw err;
        res.send({ success: false, message: result });
    })
}

const deleteUser = async(req, res) => {
    const { id } = req.body;
    Users.deleteOne({ _id: id }, (err, result) => {
        if (err) throw err;
        res.send({ success: false, message: result });
    })
}


const isAdmin = async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const data = jwt.decode(token, process.env.SECRET);
    Admins.findOne({ adminID: data._id }, (err, user) => {
        if (err) throw err;
        if (user) {
            res.send({ success: true });
        } else {
            res.send({ success: false });
        }
    })
}



module.exports = {
    createUser,
    getUserInfo,
    authUser,
    updateUser,
    deleteUser,
    isAdmin
};