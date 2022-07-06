const jwt = require('jwt-simple');

module.exports = () => {
    return (req, res, next) => {
        const { id } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.decode(token, process.env.SECRET);
        if (id === data._id) {
            next();
        } else {
            res.status(403).send("Forbidden!");
        }
    }
}