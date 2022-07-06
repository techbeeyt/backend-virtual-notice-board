const jwt = require('jwt-simple');
const AdminList = require('../models/adminList');
module.exports = (permission) => {
    return (req, res, next) => {
        let id = "dummy_id";
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.decode(token, process.env.SECRET);
        if (data._id) {
            id = data._id;
        }

        //@desc Checks if the user is admin 
        //@desc and have permission .
        //@mechanism 
        AdminList.findOne({ adminID: id }, (err, user) => {
            if (err) throw err;
            if (!user || (user && user.permissions[permission] === false)) {
                res.send("Forbidden! You do not have permission");
            } else if (user && user.permissions[permission] === true) {
                next();
            }
        })
    }

}