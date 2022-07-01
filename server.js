const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const routineRouter = require("./routes/routineRouter");
const mysqlConnection = require("./models/db_connection");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

app.use(bodyParser.json());

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("MySQL Connected!");
    } else {
        console.log("Failed to connect Database : " + err.message);
    }
});

mongoose.connect(process.env.DB_URI).then(result => console.log("MongoDB connected!")).catch(err => console.log(err));

app.use("/users", userRouter);
app.use("/routine", routineRouter);
app.listen(process.env.PORT || 3000, (err) => {
    if (!err) {
        console.log("Server is running");
    } else {
        console.log(err);
    }
});