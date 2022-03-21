const db = require('../db/connection');

// view roles
async function getRoles () {
  const sql = `SELECT 
              roles.id AS ID,
              roles.title AS Title,
              roles.salary AS Salary,
              departments.name AS department 
              FROM roles
              LEFT JOIN departments 
              ON roles.department_id = departments.id`;
  const results = await db.query(sql);
  return results[0];
}

// create a role
async function createRole (title, salary, department_id) {
  const sql = `INSERT INTO roles (title, salary, department_id) 
              VALUES (?, ?, ?)`;
  const role = [title, salary, department_id]
  const results = await db.query(sql, role);
  return results[0];
}

// delete a role


module.exports = { getRoles, createRole }