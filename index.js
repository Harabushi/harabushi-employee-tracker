const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const { getDepartments, createDepartment } = require('./src/department')
const { getRoles, createRole } = require('./src/role')
const { getEmployees, createEmployee, updateEmployee } = require('./src/employee');

const appStart = [
  {
    type: 'list',
    name: 'start',
    message: 'What would you like to do?',
    choices: [
      'View all Departments', 'View all Roles', 'View all Employees',
      'Add a Department', 'Add a Role', 'Add an Employee',
      'Update an Employee\'s Role', 'Exit'
    ]
  }
]

const departmentQuestions = [
  {
    type: "input",
    name: "departmentName",
    message: "Please enter the name of the new Department:",
    validate: departmentName => {
      if (departmentName) {
        return true;
      } else {
        console.log("Please enter the Department name!");
        return false;
      };
    }
  }
]

const roleQuestions = [
  {
    type: "input",
    name: "title",
    message: "Please enter Role Title:",
    validate: title => {
      if (title) {
        return true;
      } else {
        console.log("Please enter a Title for the Role!");
        return false;
      };
    }
  },
  {
    type: "input",
    name: "salary",
    message: "Please enter the Salary for the new Role:",
    validate: salary => {
      if (isNaN(salary)) {
        // want to add a line clear or something here
        console.log("Please enter a number for the Salary!");
        return false;
      } else if (salary) {
        return true;
      } else {
        console.log("Please enter a Salary!");
        return false;
      };
    }
  },
  {
    type: "list",
    name: "department",
    message: "What Department does this Role belong to?",
    choices: getDepartments()
  }
]

// const employeeQuestions = [
//   {

//   }
// ]

async function addDepartment () {
  const response = await inquirer.prompt(departmentQuestions);
  const results = await createDepartment(response.departmentName);
  if (results.affectedRows) {
    console.log(`Added ${response.departmentName}`);
    main();
  } else {
    console.log('There was an error somewhere')
    main();
  }
}

async function addRole () {
  // const departmentList = getDepartments();
  const response = await inquirer.prompt(roleQuestions);
  // const results = await createRole(response.title);
  if (results.affectedRows) {
    console.log(`Added ${response.title}`);
    main();
  } else {
    console.log('There was an error somewhere')
    main();
  }
}

async function main() {
  const response = await inquirer.prompt(appStart);
  // console.log(start);

  if (response.start === 'View all Departments') {
    const results = await getDepartments();
    console.table(results);
    main();
  } else if (response.start === 'View all Roles') {
    const results = await getRoles();
    console.table(results);
    main();
  } else if (response.start === 'View all Employees') {
    const results = await getEmployees();
    console.table(results);
    main();
  } else if (response.start === 'Add a Department') {
    const results = await addDepartment();
    console.table(results);
  } else if (response.start === 'Add a Role') {
    const results = await addRole();
    console.table(results);
  } else if (response.start === 'Add an Employee') {
    const results = await addEmployee();
    console.table(results);
  } else if (response.start === 'Update an Employee\'s Role') {
    const results = await update();
    console.table(results);
  } else {
    process.exit()
  }
};

function init() {
  console.log(`
    =================
    Harabushi's
    Employee Tracker
    =================
  `)
  main();
};

init();


  // await createRole('new title', 150000, 2);
  // let results = await getEmployees();

  // await db.end();
  // console.log(departments)
  // console.table(results)