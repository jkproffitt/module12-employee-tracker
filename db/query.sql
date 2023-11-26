SELECT departments.name AS name, role.department_id
FROM roles
LEFT JOIN department
ON employee_role.departement_id = department_id
ORDER BY department.departement_id;
