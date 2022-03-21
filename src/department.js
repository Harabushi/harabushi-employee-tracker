const db = require('../db/connection');

// view departments
async function getDepartments () {
  const sql = `SELECT * FROM departments`;
  let results = await db.query(sql);
  // console.table(results[0])
  // await db.end();
  return results[0];
};

// create a department
async function createDepartment (deptName) {
  const sql = `INSERT INTO departments (name) VALUES (?)`;
  let results = await db.query(sql, deptName);
  // await db.end();
  return results[0];
}

// delete a department

module.exports = { getDepartments, createDepartment }