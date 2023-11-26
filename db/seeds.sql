
USE company_db;
-- INSERT INTO department (name)
-- VALUES ("Sales"),
--        ("Finance"),
--        ("Engineering"),
--        ("Legal");

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ("Arthur", "Miller",1,1),
       ("Chinua", "Achebe",2,3),
       ("Margaret", "Atwood",3,2),
       ("Gabriel", "Garcia",4,3),
       ("Garcia" , "Marquez",5,4),
       ("Simone", "de Beauvoir",6,1 ),
       ("Jon", "Doe",7,5 );

-- INSERT INTO employee_role (department_id, title, salary)
-- VALUES (1, "Senior Sales Advocate", 82000.00),
--        (2, "Payroll Speacialist", 60000.00),
--        (3, "Software Engineer", 101000.00),
--        (4, "HR Manager", 85000.00),
--        (1, "Sales Advocate", 55000.00),
--        (2, "Tax Specialist", 90000.00),
--        (3, "Engineer", 90000.00);
       
