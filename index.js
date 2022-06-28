const cTable = require('console.table');
const bcrypt = require('bcrypt');
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: process.env.DB_PASSWORD,
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);
//Connects server to database
function intro() {
    inquirer
        .prompt([{

                type: 'checkbox',
                message: 'What would you like to do?',
                name: 'intro',
                choices: [
                    'View All Employees',
                    'View Employee by Manager',
                    'View Employees by Department',
                    'Add Employee',
                    'Update Employee Role',
                    'Update Employee Managers',
                    'Delete Employee',
                    'View All Roles',
                    'Add Role',
                    'Delete Role',
                    'View All Departments',
                    'Add Department',
                    'Delete Department',
                    'Quit',

                ],
            },

        ]).then
};

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});