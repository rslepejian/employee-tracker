var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


connection.query("SELECT * FROM wishes;", function (err, data) {
    if (err) throw err;
    // res.render("index", { wishes: data });
});

connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function (err, result) {
    if (err) throw err;
});
