// functions needed:   add
//      add department
//      add role
//      add employeee
// functions needed:   view
//      departments
//      roles
//      employees
// functions needed:   update
//      employee roles


var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

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

function addDept(name) {
    connection.query("INSERT INTO departments VALUES (?)", {name: name}, function (err, result) {
        if (err) throw err;
    });
}

function addRole(title, salary, department_id) {
    connection.query("INSERT INTO roles VALUES (?)", {title: title, salary: salary, department_id: department_id}, function (err, result) {
        if (err) throw err;
    });
}

function addEmpl(first_name, last_name, role_id, manager_id) {
    connection.query("INSERT INTO employees VALUES (?)", {first_name: first_name, last_name: last_name, role_id: role_id, manager_id: manager_id}, function (err, result) {
        if (err) throw err;
    });
}

function viewDept() {
    connection.query("SELECT * FROM departments;", function (err, data) {
        if (err) throw err;
    });
}

function viewRole() {
    connection.query("SELECT * FROM roles;", function (err, data) {
        if (err) throw err;
    });
}

function viewEmpl() {
    connection.query("SELECT * FROM employees;", function (err, data) {
        if (err) throw err;
    });
}

function updateEmpl(newRole, id) {
    connection.query("UPDATE employees SET role = " + newRole + "WHERE id = " + id, function (err, data) {
        if (err) throw err;
    });
}