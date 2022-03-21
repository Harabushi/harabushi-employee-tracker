const db = require('../db/connection');

// view employees
async function getEmployees () {
  const sql = `SELECT 
              e.id AS 'ID', 
              e.first_name AS 'First Name', 
              e.last_name AS 'Last Name', 
              roles.title AS 'Role', 
              CONCAT( employees.first_name, ' ', employees.last_name) AS "Manager's Name",
              departments.name AS 'Department Name',
              roles.salary AS 'Salary'
              FROM employees
              INNER JOIN employees e
              ON employees.id = e.manager_id
              JOIN roles
              on roles.id = e.role_id
              LEFT JOIN departments
              ON departments.id = roles.department_id
              ORDER BY e.id
              ;
            `;
  let results = await db.query(sql);
  return results[0];
}

// create a employee
async function createEmployee (first_name, last_name, role_id, manager_id) {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
              VALUES (?, ?, ?, ?)`;
  const employee = [first_name, last_name, role_id, manager_id]
  let results = await db.query(sql, employee);
  return results[0];
}

// update employee
async function updateEmployee (newRole, id) {
  const sql = `UPDATE employees SET role_id = ? 
               WHERE id = ?`;
  const updateInfo = [newRole, id]
  let results = await db.query(sql, updateInfo);
  return results[0];
}

// delete a employee


module.exports = { getEmployees, createEmployee, updateEmployee }