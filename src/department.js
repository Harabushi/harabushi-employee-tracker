const db = require('../db/connection');

// view departments
async function getDepartments () {
  const sql = `SELECT 
              departments.id AS ID,
              departments.name AS Name
              FROM departments`;
  const results = await db.query(sql);
  // console.table(results[0])
  // await db.end();
  return results[0];
};

// create a department
async function createDepartment (departmentName) {
  const sql = `INSERT INTO departments (name) VALUES (?)`;
  const results = await db.query(sql, departmentName);
  // await db.end();
  return results[0];
}

// delete a department
async function deleteDepartment (departmentId) {
  const sql = `DELETE FROM departments WHERE id = ?`;
  const results = await db.query(sql, departmentId);
  // console.table(results[0])
  // await db.end();
  return results[0];
};

module.exports = { getDepartments, createDepartment, deleteDepartment }