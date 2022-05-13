const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const mysqlConnection = require("./models/db_connection");

const app = express();

app.use(bodyParser.json());

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Database Connected!");
    } else {
        console.log("Failed to connect Database : " + err.message);
    }
});
app.use("/users", userRouter);
app.listen(3000, (err) => {
    if (!err) {
        console.log("Server is running");
    } else {
        console.log(err);
    }
});