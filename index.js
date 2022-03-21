const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const cTable = require('console.table');
const { getDepartment, createDepartment } = require('./src/department')

// const testing = function () {
//   const sql = `SELECT 
//               e.id AS 'ID', 
//               e.first_name AS 'First Name', 
//               e.last_name AS 'Last Name', 
//               roles.title AS 'Role', 
//               CONCAT( employees.first_name, ' ', employees.last_name) AS "Manager's Name",
//               departments.name AS 'Department Name',
//               roles.salary AS 'Salary'
//               FROM employees
//               INNER JOIN employees e
//               ON employees.id = e.manager_id
//               JOIN roles
//               on roles.id = e.role_id
//               LEFT JOIN departments
//               ON departments.id = roles.department_id
//               ORDER BY e.id
//               ;`
//   db.query(sql, (err, rows) => {
//     console.log({
//       message: 'success',
//       data: rows
//     });
//   })
// }

// testing();
createDepartment('new')
.then(getDepartment());