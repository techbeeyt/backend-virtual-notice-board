const jwt = require('jwt-simple');
const Users = require('../models/user.model');

module.exports = () => {
    return (req, res, next) => {

        //@desc If therer is no req.headers.authorization that means
        //@desc the user is requesting is not logged in
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            next();
        } else {
            res.status(403).send("You must be logged in");
        }
    }
}