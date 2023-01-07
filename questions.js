const cTable = require("console.table");
const db = require("./db/connection");
const { prompt } = require("inquirer");

const questions = () => {
  
  
  
    return [
    {
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        "View department",
        "View Employees",
        "Add Employee",
        "Update Employee",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
      ],
    },
    {
      type: "input",
      name: "name",
      message: "What is the name for the department?",
    },
    {
      type: "input",
      name: "title",
      message: "What is the name for the role?",
    },
    {
      type: "number",
      name: "salary",
      message: "How much will they make?",
    },
    {
      type: "list",
      name: "department_id",
      message: "What is the department?",
      choices: departments,
    },
    {
      type: "input",
      name: "first_name",
      message: "What is the first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What role?",
      choices: roles,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the manager?",
      choices: managers,
    },
    {
      type: "list",
      name: "id",
      message: "Who is the Employee that you would like to update?",
      choices: employees,
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the new role?",
      choices: roles,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is their manager?",
      choices: managers,
    },
  ];
};

module.exports = questions;
