const mysql = require("mysql");
const inquirer = require ("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password14",
    database: "employee_db",
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
    connection.end;
  });

//   start question prompts

function init() {
    console.log("Employee Manager Initialized");
    inquirer
      .prompt([
        {
          name: "selection",
          message: "What would you like to do?",
          type: "list",
          choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
          ],
        },
      ])
      .then(({ selection }) => {
        console.log(selection);
        if (selection === "View All Employees") {
          viewAllEmployees();
        } else if (selection === "View All Employees by Department") {
          viewEmployeesByDepartment();
        } else if (selection === "View All Employees by Manager") {
          viewEmployeesByManager();
        } else if (selection === "Add Employee") {
          addEmployee();
        } 
      });
  }

//   create function to view all employees

function viewAllEmployees(){
    console.log("Retrieving employees")
    const 
}

