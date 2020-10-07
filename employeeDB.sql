DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB; 
USE employeeDB; 



CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (department_name)
VALUES 
("Research and Devlopment"),
("Engineering"),
("Sales"),
("Marketing"),
("Finance"),
("Human Resources"),
("Legal");

CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(30),
     salary DECIMAL(8,2) NULL,
     department_id INTEGER,
     FOREIGN KEY (department_id) REFERENCES department(id),
     PRIMARY KEY (id)
); 
INSERT INTO role (title, salary, department_id)
VALUES ("R&D Team Lead", 120000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Sales Lead", 95000, 3), 
("Salesperson", 80000, 3),
("Marketing Consultant", 80000, 4),
("Marketing Analyst", 110000, 4),
("Accountant", 100000, 5),
("Account Manager", 150000, 5),
("HR Director", 90000, 6),
("Lawyer", 200000, 7),
("Legal Team Lead", 250000, 7);


CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT ,
    manager VARCHAR (30),
    FOREIGN KEY (role_id) REFERENCES role(id),
    -- FOREIGN KEY (manager_id) REFERENCES employee(id),
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager)
VALUES 
("Michael", "Scott", 4, "Jan Levinson"),
("Jim", "Halpert", 7, "Asian Jim"),
("Dwight", "Schrute", 1, "Ryan Howard"),
("Pamela", "Beasley", 1, null), 
("Stanley", "Hudson", 2, "Malia Brown"),
("Angela", "Martin", 2, "Holly Flax"),
("Andy", "Bernard", 3, "Kelly Kapoor"),
("Meredith", "Palmer", 5, "Karen Filippelli"),
("Kevin", "Malone", 6, null),
("Oscar", "Nunez", 6, null);




SELECT employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager FROM role
INNER JOIN employee ON employee.role_id = role.id 
INNER JOIN department ON role.department_id = department.id;
