const db = require('./db/connection');

class Department {
  constructor(id, name) {
    this.name = name;
  }
}

module.exports = Department