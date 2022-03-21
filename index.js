const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const db = require('./db/connection');
const cTable = require('console.table');

