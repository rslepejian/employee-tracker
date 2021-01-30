INSERT INTO departments (name)
VALUES ("management");

INSERT INTO departments (name)
VALUES ("it");

INSERT INTO departments (name)
VALUES ("customer service");

INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 25.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("cashier", 20.00, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("technician", 23.00, 2);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("raffi", "lepejian", 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("tech", "nician", 3, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("cash", "ear", 2, 1);