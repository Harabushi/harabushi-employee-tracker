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
async function deleteRole (roleId) {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const results = await db.query(sql, roleId);
  // console.table(results[0])
  // await db.end();
  return results[0];
};

module.exports = { getRoles, createRole, deleteRole }