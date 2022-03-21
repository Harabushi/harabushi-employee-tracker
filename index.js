const inquirer = require('inquirer');
const cTable = require('console.table');
const { getDepartments, createDepartment } = require('./src/department')
const { getRoles, createRole } = require('./src/role')
const { getEmployees, createEmployee, updateEmployee } = require('./src/employee');
const db = require('./db/connection');

async function init() {
  // await createRole('new title', 150000, 2);
  let results = await updateEmployee(4, 11);

  await db.end();
  // console.log(departments)
  console.table(results)
};

init();