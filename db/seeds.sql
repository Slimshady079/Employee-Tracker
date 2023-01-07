USE employee_tracker;

INSERT INTO department(name)
VALUES 
    ("Customer Service"),
    ("HR"),
    ("Engineering"),
    ("Sales");


INSERT INTO role(title, salary, department_id)
VALUES 
    ("Sales Rep", 40000, 4),
    ("Customer Service", 60000, 1),
    ("Tech", 80000, 3),
    ("Manager", 100000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Tim", "Honks", 4, NULL),
    ("Sarah", "Silverman", 1, 1),
    ("Brad", "Pitt", 2, 1),
    ("Max", "Gibes", 3, 1);