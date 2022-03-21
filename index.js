const inquirer = require('inquirer');
const cTable = require('console.table');
const { getDepartments, createDepartment } = require('./src/department')
const { getRoles, createRole } = require('./src/role')
const { getEmployees, createEmployee, updateEmployee } = require('./src/employee');

async function init() {
  let departments = await getDepartments();

  console.log(departments)
  // console.table(departments)
};

init();