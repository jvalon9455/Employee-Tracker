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
VALUES ("R&D Team Lead", 120000, 4),
("Lead Engineer", 150000, 7),
("Software Engineer", 120000, 7),
("Sales Lead", 95000, 1), 
("Salesperson", 80000, 1),
("Marketing Consultant", 80000, 2),
("Marketing Analyst", 110000, 2),
("Accountant", 100000, 3),
("Account Manager", 150000, 3),
("HR Director", 90000, 5),
("Lawyer", 200000, 6),
("Legal Team Lead", 250000, 6);


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
("Michael", "Scott", 2, "Jan Levinson"),
("Jim", "Halpert", 7, "Asian Jim"),
("Dwight", "Schrute", 8, "Ryan Howard"),
("Pamela", "Beasley", 7, null), 
("Stanley", "Hudson", 5, "Malia Brown"),
("Angela", "Martin", 4, "Holly Flax"),
("Andy", "Bernard", 8, "Kelly Kapoor"),
("Meredith", "Palmer", 12, "Karen Filippelli"),
("Kevin", "Malone", 11, null),
("Oscar", "Nunez", 7, null);




SELECT employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager FROM role
INNER JOIN employee ON employee.role_id = role.id 
INNER JOIN department ON role.department_id = department.id;
