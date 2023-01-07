const cTable = require("console.table");
const db = require("./db/connection");
const { prompt } = require("inquirer");

const init = () => {
  prompt([
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
  ]).then(async ({ task }) => {
    console.log(task);

    if (task === "View department") {
      db.promise()
        .query("SELECT * FROM department;")
        .then(([data]) => {
          console.table(data);
          init();
        });
    }
    if (task === "View Employees") {
      db.promise()
        .query(
          `SELECT
                  e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(e2.first_name," ",e2.last_name) AS manager 
                  FROM employee e
                  JOIN role r
                  ON e.role_id = r.id
                  JOIN department d
                  ON r.department_id = d.id
                  LEFT JOIN employee e2
                  ON e.manager_id = e2.id;`
        )
        .then(([data]) => {
          console.table(data);
          init();
        });
    }
    if (task === "View All Roles") {
      db.promise()
        .query(
          `     SELECT 
           r.id, r.title, r.salary, d.name AS department
                FROM role r
                JOIN department d
                ON r.department_id = d.id;`
        )
        .then(([data]) => {
          console.table(data);
          init();
        });
    }
    if (task === "View All Departments") {
      db.promise()
        .query("SELECT * FROM department;")
        .then(([data]) => {
          console.table(data);
          init();
        });
    }
    if (task === "Add Department") {
      prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name for the department?",
        },
      ]).then(({ name }) => {
        db.promise().query("INSERT INTO department SET name = ?;", name);
      });
    }
    if (task === "Add Role") {
      db.promise()
        .query("SELECT name, id AS value FROM department")
        .then(([departments]) => {
          prompt([
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
          ]).then((role) => {
            db.promise().query("INSERT INTO role SET ?", [role]).then(init);
          });
        });
    }
    if (task === "Add Employee") {
      let [roles] = await db
        .promise()
        .query("SELECT title AS name, id AS value FROM role");
      let [managers] = await db
        .promise()
        .query(
          `SELECT CONCAT(first_name," ", last_name) AS name, id AS value FROM employee`
        );
      managers.push({ name: "None", value: null });
      prompt([
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
      ]).then((newEmployee) => {
        db.promise()
          .query("INSERT INTO employee SET ?", [newEmployee])
          .then(init);
      });
    }
    if (task === "Update Employee") {
      let [roles] = await db
        .promise()
        .query("SELECT title AS name, id AS value FROM role");
      let [employees] = await db
        .promise()
        .query(
          `SELECT CONCAT(first_name," ", last_name) AS name, id AS value FROM employee`
        );
      employees.push({ name: "None", value: null });
      prompt([
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
          choices: employees,
        },
      ]).then((update) => {
        db.promise()
          .query(
            "UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?",
            [update.role_id, update.manager_id, update.id]
          )
          .then(init);
      });
    }
  });
};

init();
