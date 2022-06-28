const cTable = require('console.table');
const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { urlToHttpOptions } = require('url');

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: process.env.DB_PASSWORD,
        database: 'employee_db',
        port: 3001
    },
    console.log(`Connected to the employee_db database.`)
);


//Connects server to database
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

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});