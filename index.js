const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require("dotenv").config();


//creating connection to SQL Database
const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database`)
);
//connects server and database
connection.connect(function(err) {
    if (err) throw err;
    intro();
});

// Prompts
function intro() {
    inquirer
        .prompt({

            type: 'checkbox',
            message: 'What would you like to do?',
            name: 'intro',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                'Quit',

            ],

        }).then(function(ans) {
            switch (ans.choices) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'View All Departments':
                    viewAllDepts();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Add a Department':
                    addDept();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Quit':
                    quitApp();
                    break;
                default:
                    break;

            }
        })
};

function viewAllEmployees() {
    let sqlquery = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'employees listed');
        console.table('All employees', res);
        intro();
    })

}