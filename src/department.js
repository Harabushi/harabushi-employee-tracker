const db = require('../db/connection');

// view departments
async function getDepartment () {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log({
      message: 'success',
      data: rows
    });
  })
}

// create a department
async function createDepartment (deptName) {
  const sql = `INSERT INTO departments (name) VALUES (?)`;
  db.query(sql, deptName, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log({
      message: 'success',
      data: result
    });
  })
}

// delete a department

module.exports = { getDepartment, createDepartment }