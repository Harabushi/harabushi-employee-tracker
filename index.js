const inquirer = require('inquirer');
const cTable = require('console.table');
const { getDepartments, createDepartment } = require('./src/department')
const { getRoles, createRole } = require('./src/role')
const { getEmployees, createEmployee, updateEmployee } = require('./src/employee');

async function init() {
  await createDepartment('new2');
  let results = await getDepartments();

  await db.end();
  // console.log(departments)
  console.table(results)
};

init();