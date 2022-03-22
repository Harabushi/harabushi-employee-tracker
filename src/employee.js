const db = require('../db/connection');

// view employees
async function getEmployees () {
  const sql = `SELECT 
              employees.id AS 'ID', 
              employees.first_name AS 'First Name', 
              employees.last_name AS 'Last Name', 
              roles.title AS 'Role', 
              CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager's Name",
              departments.name AS 'Department Name',
              roles.salary AS 'Salary'
              FROM employees
              LEFT JOIN employees manager
              ON manager.id = employees.manager_id
              LEFT JOIN roles
              on roles.id = employees.role_id
              LEFT JOIN departments
              ON departments.id = roles.department_id`;
  const results = await db.query(sql);
  return results[0];
}

// view employees by manager
async function getManagers () {
  const sql = `SELECT
              CONCAT(manager.first_name, ' ', manager.last_name) AS Manager,
              CONCAT(employees.first_name, ' ', employees.last_name) AS Employee
              FROM employees
              LEFT JOIN employees manager
              ON manager.id = employees.manager_id
              ORDER BY Manager;`;
  const results = await db.query(sql);
  return results[0];
}

// view employees by department
async function getEmployeesDepartment (departmentId) {
  const sql = `SELECT employees.id AS ID,
              CONCAT(employees.first_name, " ", employees.last_name) AS Name
              FROM employees`;

  const results = await db.query(sql);
  return results[0];
}

// get employees by name
async function getEmployeeNames () {
  const sql = `SELECT employees.id AS ID,
              CONCAT(employees.first_name, " ", employees.last_name) AS Name
              FROM employees`;
  const results = await db.query(sql);
  return results[0];
}

// create a employee
async function createEmployee (first_name, last_name, role_id, manager_id) {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
              VALUES (?, ?, ?, ?)`;
  const employee = [first_name, last_name, role_id, manager_id]
  const results = await db.query(sql, employee);
  return results[0];
}

// update employee role
async function updateEmployeeRole (newRole, id) {
  const sql = `UPDATE employees SET role_id = ? 
               WHERE id = ?`;
  const updateInfo = [newRole, id]
  const results = await db.query(sql, updateInfo);
  return results[0];
}

// update employee manager
async function updateEmployeeManager (newManager, id) {
  const sql = `UPDATE employees SET manager_id = ? 
               WHERE id = ?`;
  const updateInfo = [newManager, id]
  const results = await db.query(sql, updateInfo);
  return results[0];
}

// delete an employee
async function deleteEmployee (employeeId) {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const results = await db.query(sql, employeeId);
  // console.table(results[0])
  // await db.end();
  return results[0];
};

module.exports = { getEmployees, createEmployee, updateEmployeeRole, updateEmployeeManager, getEmployeeNames, deleteEmployee, getManagers }