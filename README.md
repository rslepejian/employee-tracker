# Employee Tracker

## Description
This is a command line application that runs on node.js to allow users to see and update data in a sql database of employees. It supports the ability to see all employees, departments, and roles and their relevant information, create new employees, departments, and roles, and update employees with new roles.

## Built With

* [Git]
* [Github](https://github.com/)
* [Javascript](https://www.javascript.com/)
* [Node](https://nodejs.org/en/)
* [MySql](https://www.mysql.com/)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [Console Table](https://www.npmjs.com/package/console.table)


## Installation Instructions
To install this app you need node installed. Once node is installed and added to path, clone the repository and run npm install in the cloned directory to download the dependencies (mysql, inquirer, console.table). You must also have mysql workbench. 

## Usage Instructions
To run the app, first make sure that the schema in schema.sql has been run in workbench. To do this copy and paste what is in the schema.sql file and paste it into mysql workbench. Click on the lightning bolt to run and set up the database. Make sure that in a separate tab in workbench you have run the following command by pasting it in and hitting the lightning bolt: "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'". From command line navigate to the directory containing the index.js file, then input: "node index.js" then follow the onscreen prompts in your terminal. 

## Preview of Working App
* [Click Here to See Preview Video]()

## Code Snippet
This code snippet shows the code that is executed to return and display a table of every employee and their ids, first and last names, managers, and roles. This code snippet was included because the crux of this entire application was being able to display the appropriate information for each employee without deviating from sql schema that were as simple as possible. In order to achieve this a very long sql query had to be used here involving two types of joins and aliasing the employees table so that it could be joined with itself. It had to be joined with itself so that managers could be displayed for each employee because the manager_id external id column in the employees table is a reference to the id column in the employees table, and not a reference to a separate table of managers.

```javascript
function viewEmpl() {
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
```

## Authors

* **Raffi Lepejian** 

## Contact Information

- [Link to Portfolio Site](https://rslepejian.github.io/portfolio/)
- [Link to Github](https://github.com/rslepejian)
- [Link to LinkedIn](https://linkedin.com/in/raffi-lepejian-071876153)