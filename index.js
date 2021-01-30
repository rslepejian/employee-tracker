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
    connection.query("INSERT INTO departments SET ?", {name: name}, function (err, result) {
        if (err) throw err;
    });
}

function addRole(title, salary, department_id) {
    connection.query("INSERT INTO roles SET ?", {title: title, salary: salary, department_id: department_id}, function (err, result) {
        if (err) throw err;
    });
}

function addEmpl(first_name, last_name, role_id, manager_id) {
    connection.query("INSERT INTO employees SET ?", {first_name: first_name, last_name: last_name, role_id: role_id, manager_id: manager_id}, function (err, result) {
        if (err) throw err;
    });
}

function viewDept() {
    connection.query("SELECT * FROM departments;", function (err, data) {
        if (err) throw err;
        newTable = cTable.getTable(data);
        console.table(newTable);
    });
}

function viewRole() {
    connection.query("SELECT * FROM roles;", function (err, data) {
        if (err) throw err;
        newTable = cTable.getTable(data);
        console.table(newTable);
    });
}

function viewEmpl() {
    connection.query("SELECT * FROM employees;", function (err, data) {
        if (err) throw err;
        newTable = cTable.getTable(data);
        console.table(newTable);
    });
}

function updateEmpl(newRole, newDept, first_name, last_name) {
    // find the id of the new role
    // find the department id of the new role
    // set the employee's role id to the role id
    // set the employees department id to the new one
    connection.query("UPDATE employees SET role = ? WHERE ?", {roleid: newRoleId, department_id: newDeptId},{first_name: first_name, last_name: last_name},function (err, data) {
        if (err) throw err;
    });
}
addDept("quality assurance");
addRole("quality tester", 15, 4);
addEmpl("qual", "testy", 4, 1);


viewDept();
viewEmpl();
viewRole();

