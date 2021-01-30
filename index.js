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
    connection.query("INSERT INTO departments SET ?", { name: name }, function (err, result) {
        if (err) throw err;
    });
}

function addRole(title, salary, department_id) {
    connection.query("INSERT INTO roles SET ?", { title: title, salary: salary, department_id: department_id }, function (err, result) {
        if (err) throw err;
    });
}

function addEmpl(first_name, last_name, role_id, manager_id) {
    connection.query("INSERT INTO employees SET ?", { first_name: first_name, last_name: last_name, role_id: role_id, manager_id: manager_id }, function (err, result) {
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
    // find names of departments based on ids
    // find names of managers based on ids
    connection.query("SELECT departments.name, roles.title, roles.salary FROM departments INNER JOiN roles ON departments.id = roles.department_id;", function (err, data) {
        if (err) throw err;
        newTable = cTable.getTable(data);
        console.table(newTable);
    });
}

function viewEmpl() {
    // find names of roles based on ids
    // find name of manager based on id?
    connection.query(`SELECT e1.first_name, e1.last_name, CONCAT(e2.first_name, ' ', e2.last_name) AS 'Manager', r.title FROM roles as r INNER JOIN employees as e1 ON e1.role_id = r.id LEFT JOIN employees as e2 ON e1.manager_id = e2.id`, function (err, data) {
        if (err) throw err;
        newTable = cTable.getTable(data);
        console.table(newTable);
    });
}

function updateEmpl(newRoleId, firstname, lastname, id) {
    // find the id of the new role
    // find the department id of the new role
    // set the employee's role id to the role id
    // set the employees department id to the new one
    connection.query("UPDATE `employees` SET ? WHERE ? AND ? AND ?;", [{role_id: newRoleId}, {first_name: firstname}, {last_name: lastname}, {id: id}], function (err, data) {
        if (err) throw err;
    });
}
// addDept("quality assurance");
// addRole("quality tester", 15, 4);
// addEmpl("qual", "testy", 4, 1);

// updateEmpl(2, "tech", "nician", 2);

// viewDept();
viewEmpl();
// viewRole();



