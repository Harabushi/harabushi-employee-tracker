const db = require('./db/connection');

class Role {
  constructor(id, title, salary, deptId) {
    this.title = title;
    this.salary = salary;
    this.deptId = deptId;
  }
}

module.exports = Role