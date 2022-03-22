const inquirer = require('inquirer');
const cTable = require('console.table');
const { getDepartments, createDepartment, deleteDepartment } = require('./src/department');
const { getRoles, createRole, deleteRole } = require('./src/role');
const { getEmployees, createEmployee, updateEmployeeRole, updateEmployeeManager, getEmployeeNames, deleteEmployee, getEmployeesManagers, getEmployeesDepartment } = require('./src/employee');

async function addDepartment () {
  const response = await inquirer.prompt([
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
  ]);
  const results = await createDepartment(response.departmentName);
  if (results.affectedRows) {
    console.log(`Added ${response.departmentName}`);
    main();
  } else {
    console.log('There was an error somewhere')
    main();
  }
};

async function addRole () {
  const departmentList = await getDepartments();
  const departments = departmentList.map(list => ({
    name: list.Name,
    value: list.ID
  }));

  // console.log(departments);
  const response = await inquirer.prompt([
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
      choices: departments
    }
  ]);
  const results = await createRole(response.title, response.salary, response.department);
  if (results.affectedRows) {
    console.log(`Added ${response.title}`);
    main();
  } else {
    console.log('There was an error somewhere')
    main();
  }
};

async function addEmployee () {
  const roleList = await getRoles();
  const roles = roleList.map(list => ({
    name: list.Title,
    value: list.ID
  }));
  // console.log(roles);

  // I think classes *might* help me do this cleaner
  // merge and concat didn't work on this part, just added getEmployeeNames to employee.js
  const employeeList = await getEmployeeNames();
  const employees = employeeList.map(list => ({
    name: list.Name,
    value: list.ID
  }));
  employees.push({
    name: 'None',
    value: null
  })
  // console.log(employees);

  const response = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Please enter the First Name of the Employee:",
      validate: firstName => {
        if (firstName) {
          return true;
        } else {
          console.log("Please enter the Employee's name!");
          return false;
        };
      }
    },
    {
      type: "input",
      name: "lastName",
      message: "Please enter the Last Name of the Employee:",
      validate: lastName => {
        if (lastName) {
          return true;
        } else {
          console.log("Please enter the Employee's name!");
          return false;
        };
      }
    },
    {
      type: "list",
      name: "role",
      message: "Please select a Role for the Employee:",
      choices: roles
    },
    {
      type: "list",
      name: "manager",
      message: "Please select a Manager for the Employee:",
      choices: employees
    }
  ])
  const results = await createEmployee(response.firstName, response.lastName, response.role, response.manager);
  if (results.affectedRows) {
    console.log(`Added ${response.firstName} ${response.lastName}`);
    main();
  } else {
    console.log('There was an error somewhere')
    main();
  }
};

async function updateRole () {
  const roleList = await getRoles();
  const roles = roleList.map(list => ({
    name: list.Title,
    value: list.ID
  }));

  const employeeList = await getEmployeeNames();
  const employees = employeeList.map(list => ({
    name: list.Name,
    value: list.ID
  }));

  const response = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Please select the Employee to Update:",
      choices: employees
    },
    {
      type: "list",
      name: "role",
      message: "Please select the Employee\'s new Role:",
      choices: roles
    }
  ]);
  const updatedEmployee = employees[response.employee -1];
  // console.log(updatedEmployee.name);
  // console.log(response);
  const results = await updateEmployeeRole(response.role, response.employee);
  if (results.affectedRows) {
    console.log(`Updated ${updatedEmployee.name}'s Role`);
    main();
  } else {
    console.log('There was an error somewhere')
    main();
  }
};

async function updateManager () {
  const employeeList = await getEmployeeNames();
  const employees = employeeList.map(list => ({
    name: list.Name,
    value: list.ID
  }));

  const employee = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Please select the Employee to Update:",
      choices: employees
    }
  ]);
  const updatedEmployee = employees[employee.id -1];
  // console.log(updatedEmployee.name);
  // console.log(employee);

  // filter out this employee as a possible manager
  const possibleManagers = employeeList.filter(employees => employees.ID !== employee.id)
  .map(list => ({
    name: list.Name,
    value: list.ID
  }));
  // console.log(possibleManagers);

  const response = await inquirer.prompt([
    {
      type: "list",
      name: "manager",
      message: "Please select the Employee\'s new Manager:",
      choices: possibleManagers
    }
  ]);

  // const updatedEmployee = employees[response.id -1];
  // console.log(updatedEmployee.name);
  // console.log(response);
  const results = await updateEmployeeManager(response.manager, employee.id);
  if (results.affectedRows) {
    console.log(`Updated ${updatedEmployee.name}'s Manager`);
    main();
  } else {
    console.log('There was an error somewhere')
    main();
  }
};

async function departmentDelete () {
  const departmentList = await getDepartments();
  const departments = departmentList.map(list => ({
    name: list.Name,
    value: list.ID
  }));

  const response = await inquirer.prompt([
    {
      type: "list",
      name: "department",
      message: "Please select the Department to Delete:",
      choices: departments
    }
  ]);
  const deletedDepartment = departments[response.department -1];
  // console.log(response.department);
  const results = await deleteDepartment(response.department);
  if (results.affectedRows) {
    console.log(`Deleted ${deletedDepartment.name}`);
    main();
  } else {
    console.log('There was an error somewhere')
    main();
  }
};

async function roleDelete () {
  const roleList = await getRoles();
  const roles = roleList.map(list => ({
    name: list.Title,
    value: list.ID
  }));

  const response = await inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Please select the Role to Delete:",
      choices: roles
    }
  ]);
  const deletedRole = roles[response.role -1];
  // console.log(response.department);
  const results = await deleteRole(response.role);
  if (results.affectedRows) {
    console.log(`Deleted ${deletedRole.name}`);
    main();
  } else {
    console.log('There was an error somewhere')
    main();
  }
};

async function employeeDelete () {
  const employeeList = await getEmployeeNames();
  const employees = employeeList.map(list => ({
    name: list.Name,
    value: list.ID
  }));

  const response = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Please select the Employee to Delete:",
      choices: employees
    }
  ]);
  const deletedEmployee = employees[response.employee -1];
  // console.log(response.department);
  const results = await deleteEmployee(response.employee);
  if (results.affectedRows) {
    console.log(`Deleted ${deletedEmployee.name}`);
    main();
  } else {
    console.log('There was an error somewhere')
    main();
  }
};

async function main() {
  const response = await inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: 'What would you like to do?',
      choices: [
        'View all Departments', 'View all Roles', 'View all Employees',
        'Add a Department', 'Add a Role', 'Add an Employee',
        'Delete a Department', 'Delete a Role', 'Delete an Employee',
        'Update an Employee\'s Role', 'Update an Employee\'s Manager',
        'View Employees by Manager', 'View Employees by Department', 'View Utilized Budgets', 'Exit'
      ]
    }
  ]);
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
    const results = await updateRole();
    console.table(results);
  } else if (response.start === 'Delete a Department') {
    const results = await departmentDelete();
    console.table(results);
  } else if (response.start === 'Delete a Role') {
    const results = await roleDelete();
    console.table(results);
  } else if (response.start === 'Delete an Employee') {
    const results = await employeeDelete();
    console.table(results);
  } else if (response.start === 'Update an Employee\'s Manager') {
    const results = await updateManager();
    console.table(results);
  } else if (response.start === 'View Employees by Manager') {
    const results = await getEmployeesManagers();
    console.table(results);
    main();
  } else if (response.start === 'View Employees by Department') {
    const results = await getEmployeesDepartment();
    console.table(results);
    main();
  } else if (response.start === 'View Utilized Budgets') {
    // const results = await getRoles();
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
