const mysqlConnection = require("../models/db_connection");

const full_routine = (req, res) => {
    const { department, series, section } = req.body;
    const qry = `SELECT * FROM routines WHERE department ='${department}' and series ='${series}' and section ='${section}'`;
    mysqlConnection.query(qry, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

const get_by_day = (req, res) => {
    const { department, series, section, week_day } = req.body;
    const qry = `SELECT * FROM routines WHERE department ='${department}' and series ='${series}' and section ='${section}' and week_day ='${week_day}'`;
    mysqlConnection.query(qry, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

const get_by_id = (req, res) => {
    const { id } = req.body;
    const qry = `SELECT * FROM routines WHERE id = ${id}`;
    mysqlConnection.query(qry, (err, result) => {
        res.send(result);
        console.log(result);
    });
};

const add_class = (req, res) => {
    const {
        class_title,
        start_time,
        end_time,
        week_day,
        room_no,
        teacher_name,
        teacher_code,
        department,
        series,
        section,
    } = req.body;
    const qry = `INSERT INTO routines (class_title, start_time, end_time, week_day, room_no, teacher_name, teacher_code,department, series, section) VALUES ('${class_title}', '${start_time}', '${end_time}', '${week_day}', ${room_no}, '${teacher_name}', '${teacher_code}', '${department}', ${series}, '${section}')`;
    mysqlConnection.query(qry, (err, result) => {
        res.send({
            success: true,
            message: result,
        });
    });
};

module.exports = { full_routine, add_class, get_by_id, get_by_day };