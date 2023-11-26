//Dependencies found here
import inquirer from 'inquirer';
import mysql from 'mysql2';

const db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'company_db',
});

db.connect(function (err) {
	if (err) throw err;
	console.log('connected as id ' + db.threadId);

	start();
});

//What the user will first see once logged into node
function start() {
	inquirer
		.prompt({
			message: 'What would you like to do?',
			name: 'option',
			type: 'list',
			choices: [
				'Add department',
				'Add role',
				'Add employee',
				'View all departments',
				'View all roles',
				'View all employees',
				'Update employee role',
				'Quit',
			],
		})
		.then((answer) => {
			console.log('You entered: ' + answer.option);
			switch (answer.option) {
				case 'Add department':
					addDepartment();
					break;
				case 'Add role':
					addRole();
					break;
				case 'Add employee':
					addEmployee();
					break;
				case 'View all departments':
					viewDepartment();
					break;
				case 'View all roles':
					viewRoles();
					console.log('out of view roles');
					break;
				case 'View all employees':
					viewEmployees();
					break;
				case 'Update employee role':
					updateEmployee();
					break;
				default:
					quit();
			}
		});
}

function addDepartment() {
	inquirer
		.prompt({
			type: 'input',
			message: 'What is the name of the department?',
			name: 'name',
		})
		.then((answer) => {
			db.query(
				'INSERT INTO department SET ?',
				{ name: answer.name },
				(err, result) => {
					if (err) throw err;
					console.log('Department added successfully!');
					start();
				}
			);
		});
}

function addRole() {
	db.query('SELECT * FROM department', (err, department) => {
		if (err) throw err;
		const departmentChoices = department.map((department) => ({
			name: `${department.name}`,
			value: department.id,
		}));
		inquirer
			.prompt([
				{
					type: 'input',
					message: "What's the name of the role?",
					name: 'role',
				},
				{
					type: 'input',
					message: 'What is the salary?',
					name: 'salary',
				},
				{
					type: 'input',
					message: 'What is the title?',
					name: 'title',
				},
				{
					type: 'list',
					message: 'What is the department?',
					choices: departmentChoices,
					name: 'department_id',
				},
			])
			.then((answer) => {
				db.query(
					'INSERT INTO employee_role  SET ?',
					{
						title: answer.title,
						salary: answer.salary,
						department_id: answer.department_id,
					},
					(err, result) => {
						if (err) throw err;
						console.log('Role added successfully!');
						start();
					}
				);
			});
	});
}

function addEmployee() {
	inquirer
		.prompt([
			{
				type: 'input',
				message: "What's the first name of the employee?",
				name: 'first_name',
			},
			{
				type: 'input',
				message: "What's the last name of the employee?",
				name: 'last_name',
			},
			{
				type: 'input',
				message: "What is the employee's role id?",
				name: 'role_id',
			},
			{
				type: 'input',
				message: 'What is the manager id number?',
				name: 'manager_id',
			},
		])
		.then((answer) => {
			db.query(
				'INSERT INTO employee SET ?',
				{
					first_name: answer.first_name,
					last_name: answer.last_name,
					role_id: answer.role_id,
					manager_id: answer.manager_id,
				},
				(err, result) => {
					if (err) throw err;
					console.log('Employee added!');
					console.table(result);
					start();
				}
			);
		});
}

function updateEmployee() {
	db.query('SELECT * FROM employee', (err, employees) => {
		if (err) throw err;

		const employeeChoices = employees.map((employee) => ({
			name: `${employee.first_name} ${employee.last_name}`,
			value: employee.id,
		}));

		inquirer
			.prompt([
				{
					name: 'employeeId',
					type: 'list',
					message: 'Select the employee to update:',
					choices: employeeChoices,
				},
				{
					name: 'newRoleId',
					type: 'input',
					message: 'Enter the new role ID for the employee:',
				},
			])
			.then((answer) => {
				const { employeeId, newRoleId } = answer;
				db.query(
					'UPDATE employee SET role_id = ? WHERE id = ?',
					[newRoleId, employeeId],
					(err, result) => {
						if (err) throw err;
						console.log('Employee updated successfully!');
						start();
					}
				);
			});
	});
}

function viewDepartment() {
	let query = 'SELECT * FROM department';
	db.query(query, (err, results) => {
		if (err) throw err;
		console.table(results);
		start();
	});
}

function viewRoles() {
	let query = 'SELECT * FROM employee_role';
	db.query(query, (err, results) => {
		if (err) throw err;
		console.table(results);
		start();
	});
}

function viewEmployees() {
	let query =
		'SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name, employee_role.salary, employee.manager_id FROM employee JOIN employee_role ON employee.role_id = employee_role.id JOIN department ON employee_role.department_id = department.id';
	db.query(query, (err, results) => {
		if (err) throw err;
		console.table(results);
		start();
	});
}

function quit() {
	db.end();
	process.exit();
}
