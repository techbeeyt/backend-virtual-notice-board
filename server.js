const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require('cors');
const userRouter = require("./routes/user.router");
const routineRouter = require("./routes/routine.router");
const taskRouter = require("./routes/task.router");
const passport = require('passport');
const dotenv = require("dotenv");
const connectDB = require("./config/database.config");
dotenv.config({ path: "./.env" });

connectDB();

const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize())
require('./config/passport')(passport);

app.use("/users", userRouter);
app.use("/routines", routineRouter);
app.use("/tasks", taskRouter);

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, (err) => {
    if (!err) {
        console.log(`#__Server is running in [${process.env.NODE_ENV?process.env.NODE_ENV:'WEB'} mode] on [port = ${PORT}]`);
    } else {
        console.log(err);
    }
});