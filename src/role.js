const db = require('../db/connection');

// view roles
async function getRoles () {
  const sql = `SELECT roles.*, departments.name 
              AS department 
              FROM roles
              LEFT JOIN departments 
              ON roles.department_id = departments.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log({
      message: 'success',
      data: rows
    });
  });
}

// create a role
async function createRole (title, salary, department_id) {
  const sql = `INSERT INTO roles (title, salary, department_id) 
              VALUES (?, ?, ?)`;
  const role = [title, salary, department_id]
  db.query(sql, role, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log({
      message: 'success',
      data: result
    });
  });
}

// delete a role


module.exports = { getRoles, createRole }