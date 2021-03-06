const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password14",
    database: "employeeDB",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
    connection.end;
});

//   start question prompts

function init() {
    // console.log("Employee Manager Initialized");
    inquirer
        .prompt([
            {
                name: "selection",
                message: "What would you like to do?",
                type: "list",
                choices: [
                    "View All Employees",
                    "View All Employees by Department",
                    "View Roles",
                    "Add Employee",
                    "Add Department",
                    "Add Roles",
                    "Update Employee Role",
                    // "View All Employees by Manager",
                    "Exit",
                ],
            },
        ])
        .then(({ selection }) => {
            console.log(selection);
            if (selection === "View All Employees") {
                viewAllEmployees();
            } else if (selection === "View All Employees by Department") {
                viewEmployeesByDepartment();
            } else if (selection === "View Roles") {
                viewRoles();
            } else if (selection === "Add Employee") {
                addEmployee();
            } else if (selection === "Add Department") {
                addDepartments();
            } else if (selection === "Add Roles") {
                addRoles();
            } else if (selection === "Update Employee Role") {
                updateEmployeeRole();
                // }else if (selection === "View All Employees by Manager") {
                //     viewEmployeesByManager();
            } else if (selection === "Exit") {
                exit();
            }
        });
}

//   create function to view all employees

function viewAllEmployees() {
    connection.query(
        `SELECT employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager FROM role
        INNER JOIN employee ON employee.role_id = role.id 
        INNER JOIN department ON role.department_id = department.id`,
        function (err, res) {
            if (err) throw err;
            console.table(res)
            init();
        }
    );
}

// create function to view employees by department

function viewEmployeesByDepartment() {
    connection.query(`SELECT * FROM DEPARTMENT`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
        })
}

// create function to view roles

function viewRoles() {
    connection.query(`SELECT role.title, role.salary from role`, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}

// create function to add an employee
function addEmployee() {
    const newEmployee = [];
    connection.query("SELECT title, id FROM role", (err, res) => {
        if (err) throw err;
        if (res.length > 0) {
            for (let i = 0; i < res.length; i++) {
                const employeePrompt = {
                    name: res[i].title,
                    value: res[i].id,
                };
                newEmployee.push(employeePrompt);
            }
        }
    });
    inquirer
        .prompt([
            {
                name: "firstName",
                message: "Enter employees first name.",
                type: "input"
            },
            {
                name: "lastName",
                message: "Enter employees last name.",
                type: "input"
            },
            {
                name: "role",
                message: "Select the the role of the employee.",
                type: "list",
                choices: newEmployee,
            },
            {
                name: "employeesManager",
                message: "Select the employees manager.",
                type: "list",
                choices: [
                    "Jan Levinson",
                    "Asian Jim",
                    "Ryan Howard",
                    "Malia Brown",
                    "Holly Flax",
                    "Kelly Kapoor",
                    "Karen Filippelli",
                    "None",
                ],
            },
        ])
        .then(({ firstName, lastName, role, employeesManager }) => {
            console.log(`${firstName} ${lastName}`);
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: role,
                    manager: employeesManager,
                })
            init();
        });
}


// create function to add a new department
function addDepartments() {
    inquirer
        .prompt([
            {
                name: "newDepartmentName",
                message: "Name your department.",
                type: "input",
            }
        ])
        .then(({ newDepartmentName }) => {
            console.log(`${newDepartmentName}`);
            connection.query("INSERT INTO department SET ?",
                {
                    department_name: newDepartmentName
                })
            init();
        })
}

// create a function create a new role

function addRoles() {
    inquirer
        .prompt([
            {
                name: "newRole",
                message: "Enter new role title you would like.",
                type: "input"
            },
            {
                name: "newSalary",
                message: "Enter your desired salary.",
                type: "input"
            },
            {
                name: "departmentRole",
                message: "Select the department your role is under.",
                type: "list",
                choices: [
                    "Research and Development",
                    "Engineering",
                    "Sales",
                    "Marketing",
                    "Finance",
                    "Human Resources",
                    "Legal",
                ]
            }
        ]).then(({ newRole, newSalary, departmentRole }) => {
            console.log(`${newRole}`),
                connection.query("INSERT INTO role SET ?",
                    {
                        title: newRole,
                        salary: newSalary,
                        department_id: departmentRole,
                    })
            viewRoles();
            init();
        })
}

// create a function to update the employees role

function updateEmployeeRole() {
    connection.query("SELECT first_name, id FROM employee", function (err, res){
        if (err) throw err;
        const newEmployeeRole = [];
        if (res.length > 0) {
            for (let i = 0; i < res.length; i++){
                const promtionDemotion = {
                    name: res[i].first_name,
                    value: res[i].id,
                };
                newEmployeeRole.push(promtionDemotion);
            }
        }
        let updatedRole;
        let chooseEmployee;
        inquirer
        .prompt([
            {
                name: "chooseEmployee",
                message: "Choose the employee you want to update their roll.",
                type: "list",
                choices: newEmployeeRole,
            }
        ])
        inquirer
        .prompt([
            {
                name: "updatedRole",
                message: "Select a new role for your employee.",
                type: "list",
                choices:[
                    "R&D Team Lead",
                    "Lead Engineer",
                    "Software Engineer",
                    "Sales Lead",
                    "Salesperson",
                    "Marketing Consultant",
                    "Marketing Analyst",
                    "Accountant",
                    "Account Manager",
                    "HR Director",
                    "Lawyer",
                    "Legal Team Lead",
                ],
            }
        ])
        .then((role) => {
            if (role.name === "R&D Team Lead"){
                updatedRole = 2;
            } else if (role.name === "Lead Engineer"){
                updatedRole = 3;
            }else if (role.name === "Software Engineer"){
                updatedRole = 4;
            }else if (role.name === "Sales Lead"){
                updatedRole = 5;
            }else if (role.name === "Salesperson"){
                updatedRole = 6;
            }else if (role.name === "Marketing Consultant"){
                updatedRole = 7;
            }else if (role.name === "Accountant"){
                updatedRole = 8;
            }else if (role.name === "Account Manager"){
                updatedRole = 9;
            }else if (role.name === "HR Director"){
                updatedRole = 10;
            }else if (role.name === "Lawyer"){
                updatedRole = 11;
            }else if (role.name === "Legal Team Lead"){
                updatedRole = 12;
            }

            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id:updatedRole,
                    },
                    {
                        id: res.chooseEmployee,
                    },
                ],
                (err, res) => {
                    if(err) throw err;
                    console.log("Updated employee role.");
                    init();
                }
            );
        });
    });
}

// create function to end
function exit(){
    console.log("You have exited.");
    connection.end();
}