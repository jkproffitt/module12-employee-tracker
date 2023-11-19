INSERT INTO departments (name)
VALUES ("Sales"),
       ("Finance"),
       ("Sales"),
       ("Engineering"),
       ("Legal");

INSERT INTO roles (department_id, title, salary)
VALUES (1, "level 1", 100),
       (2, "level 1", 100),
       (1, "level 3", 300),
       (3, "level 1", 100),
       (5, "level 1", 100),
       (1, "level 4", 100),
       (5, "level 2", 200);
       
INSERT INTO employee (department_id, first_name, last_name)
VALUES (1, "Arthur", "Miller" 100),
       (2, "Chinua", "Achebe" 100),
       (1, "Margaret", "Atwood" 300),
       (3, "Gabriel", "Garcia"  100),
       (5, "Garcia" , "Marquez" 100),
       (1, "Simone", "de Beauvoir", 100),
       (5, "Jon", "Doe", 200);