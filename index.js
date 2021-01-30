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

function addDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the new department called?',
                name: 'dept_name'
            }
        ])
        .then((response) => {
            connection.query("INSERT INTO departments SET ?", { name: response.dept_name }, function (err, result) {
                if (err) throw err;
            });
            console.log("Department added!");
            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: 'Press enter to continue',
                        choices: ["Continue"],
                        name: 'confirmation'
                    }
                ])
                .then((response) => {
                    init();
                });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the new roles title?',
                name: 'role_title'
            },
            {
                type: 'number',
                message: 'What is the new roles salary?',
                name: 'role_salary'
            },
            {
                type: 'input',
                message: 'What is the new roles department?',
                name: 'role_department'
            }
        ])
        .then((response) => {
            // find dept id based on dept name

            connection.query("SELECT id FROM departments WHERE ?", { name: response.role_department }, function (err, data) {
                if (err) throw err;
                var department_id = data[0].id;
                connection.query("INSERT INTO roles SET ?", { title: response.role_title, salary: response.role_salary, department_id: department_id }, function (err, result) {
                    if (err) throw err;
                });
                console.log("Role added!");
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            message: 'Press enter to continue',
                            choices: ["Continue"],
                            name: 'confirmation'
                        }
                    ])
                    .then((response) => {
                        init();
                    });
            });

        });
}

function addEmpl(first_name, last_name, role_id, manager_id) {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the new employees first name?',
                name: 'firstname'
            },
            {
                type: 'input',
                message: 'What is the new employees last name?',
                name: 'lastname'
            },
            {
                type: 'input',
                message: 'What is the new employees role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Who is the new employees manager?',
                name: 'manager'
            }
        ])
        .then((response) => {
            // find role id based on role name
            //      find manager id based on manager name
            connection.query("SELECT id FROM roles WHERE ?", { title: response.role }, function (err, data) {
                if (err) throw err;
                var roleid = data[0].id;
                // split manager name into first, last names
                var manager_name = response.manager.split(" ");
                connection.query("SELECT id FROM employees WHERE ? AND ?", [{ first_name: manager_name[0] }, { last_name: manager_name[1] }], function (err, data) {
                    if (err) throw err;
                    var managerid = data[0].id;
                    connection.query("INSERT INTO employees SET ?", { first_name: response.firstname, last_name: response.lastname, role_id: roleid, manager_id: managerid }, function (err, result) {
                        if (err) throw err;
                    });
                    console.log("Employee added!");
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                message: 'Press enter to continue',
                                choices: ["Continue"],
                                name: 'confirmation'
                            }
                        ])
                        .then((response) => {
                            init();
                        });
                })
            });

        });
}

function viewDept() {
    connection.query("SELECT * FROM departments;", function (err, data) {
        if (err) throw err;
        newTable = cTable.getTable(data);
        console.table(newTable);
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Press enter to continue',
                    choices: ["Continue"],
                    name: 'confirmation'
                }
            ])
            .then((response) => {
                init();
            });
    });
}

function viewRole() {
    // find names of departments based on ids
    // find names of managers based on ids
    connection.query("SELECT departments.name, roles.title, roles.salary FROM departments INNER JOiN roles ON departments.id = roles.department_id;", function (err, data) {
        if (err) throw err;
        newTable = cTable.getTable(data);
        console.table(newTable);
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Press enter to continue',
                    choices: ["Continue"],
                    name: 'confirmation'
                }
            ])
            .then((response) => {
                init();
            });
    });
}

function viewEmpl() {
    // find names of roles based on ids
    // find name of manager based on id?
    connection.query(`SELECT e1.id, e1.first_name, e1.last_name, CONCAT(e2.first_name, ' ', e2.last_name) AS 'Manager', r.title FROM roles as r INNER JOIN employees as e1 ON e1.role_id = r.id LEFT JOIN employees as e2 ON e1.manager_id = e2.id`, function (err, data) {
        if (err) throw err;
        newTable = cTable.getTable(data);
        console.table(newTable);
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Press enter to continue',
                    choices: ["Continue"],
                    name: 'confirmation'
                }
            ])
            .then((response) => {
                init();
            });
    });
}

function updateEmpl() {
    // find the id of the new role
    // find the department id of the new role
    // set the employee's role id to the role id
    // set the employees department id to the new one

    connection.query(`SELECT e1.first_name, e1.last_name, CONCAT(e2.first_name, ' ', e2.last_name) AS 'Manager', r.title FROM roles as r INNER JOIN employees as e1 ON e1.role_id = r.id LEFT JOIN employees as e2 ON e1.manager_id = e2.id`, function (err, data) {
        if (err) throw err;
        newTable = cTable.getTable(data);
        console.table(newTable);
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Employees listed, press enter to continue',
                    choices: ["Continue"],
                    name: 'confirmation'
                }
            ])
            .then((response) => {
                inquirer
                    .prompt([
                        {
                            type: 'number',
                            message: 'What is the id of the employee you would like to update?',
                            name: 'id'
                        },
                        {
                            type: 'input',
                            message: 'What is the employees new role?',
                            name: 'newRole'
                        }
                    ])
                    .then((response) => {
                        connection.query("SELECT id FROM roles WHERE ?", { title: response.newRole }, function (err, data) {
                            if (err) throw err;
                            var newRoleId = data[0].id;
                            connection.query("UPDATE `employees` SET ? WHERE ?;", [{ role_id: newRoleId }, { id: response.id }], function (err, data) {
                                if (err) throw err;
                                console.log("Employee Updated!");
                                init();
                            });
                        })
                    });
            });
    });
}
// addDept("quality assurance");
// addRole("quality tester", 15, 4);
// addEmpl("qual", "testy", 4, 1);

// updateEmpl(2, 2);

// viewDept();
// viewEmpl();
// viewRole();

function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ['See Departments', 'See Roles', 'See Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role'],
                name: 'choice'
            }
        ])
        .then((response) => {
            switch (response.choice) {
                case 'See Departments':
                    viewDept();
                    break;
                case 'See Roles':
                    viewRole();
                    break;
                case 'See Employees':
                    viewEmpl();
                    break;
                case 'Add a Department':
                    addDept();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmpl();
                    break;
                case 'Update Employee Role':
                    updateEmpl();
                    break;
            }
        });
}

init();


