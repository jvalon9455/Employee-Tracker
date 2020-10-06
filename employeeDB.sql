DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO 
    department (name)
VALUES 
    ("Orthopedics"),
    ("Research and Development"),
    ("Marketing"),
    ("Human Resources"),
    ("Physical Therapy"),
    ("Sports Medicine");

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 4),
    department_id INT,
    PRIMARY KEY (id)
);

INSERT INTO 
    roles (title, salary, department_id)
VALUES
    ("Director of Orthopedics", 350000, 1),
    ("Director of Research and Development", 80000, 2),
    ("Director of Marketing", 80000, 3),
    ("Head of Human Resources", 75000, 4),
    ("Head of Physical Therapy", 140000, 5),
    ("Director of Sports Medicine", 90000, 6),
    ("Orthopeaedic Surgeon", 300000, 1),
    ("Manager", 70000, 1),
    ("Manager", 70000, 2),
    ("Manager", 70000, 3),
    ("Manager", 70000, 4),
    ("Manager", 70000, 5),
    ("Manager", 70000, 6),
    ("R&D Associate", 65000, 2),
    ("Marketing Coordinator", 65000, 3),
    ("HR Recruiter", 45000, 4),
    ("Physical Therapist", 110000, 5),
    ("Athletic Trainer", 42000, 6);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);




