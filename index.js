const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require("dotenv").config();



const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database`)
);

connection.connect(function(err) {
    if (err) throw err;
    intro();
});

// Prompts
function intro() {
    inquirer
        .prompt({

            type: 'list',
            message: 'What would you like to do?',
            name: 'choices',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                'Quit',

            ]

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
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'employees listed');
        console.table('All employees:', res);
        intro();
    })

};

function viewAllDepts() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'Departments listed');
        console.table('All departments:', res);
        intro();
    })

};

function viewAllRoles() {
    var query = 'SELECT * FROM roles';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'roles listed');
        console.table('All roles:', res);
        intro();
    })
};

function addEmployee() {
    connection.query('SELECT * FROM roles', function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: 'first_name',
                    type: 'input',
                    message: "What is the employees first name? ",
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the employees last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the employees manager ID? "
                },
                {
                    name: 'roles',
                    type: 'list',
                    choices: function() {
                        var roleArr = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArr.push(res[i].title);
                        }
                        return roleArr;
                    },
                    message: "What is this employees role? "
                }
            ]).then(function(ans) {
                let role_id;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].title == ans.role) {
                        role_id = res[i].id;
                        console.log(role_id)
                    }
                }
                connection.query(
                    'INSERT INTO employee SET ?', {
                        first_name: ans.first_name,
                        last_name: ans.last_name,
                        manager_id: ans.manager_id,
                        role_id: role_id,
                    },
                    function(err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        intro();
                    })
            })
    })
};

function addDept() {
    inquirer
        .prompt([{
            name: 'dept_name',
            type: 'input',
            message: 'Which department would you like to add?'
        }]).then(function(ans) {
            connection.query(
                'INSERT INTO department SET ?', {
                    dept_name: ans.dept_name
                });
            let query = 'SELECT * FROM department';
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log('Your new department has been added');
                console.table('All departments:', res);
                intro();
            })
        })
};

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;

        inquirer
            .prompt([{
                    name: 'new_role',
                    type: 'input',
                    message: "What new role would you like to add?"
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of this role? (number)'
                },
                {
                    name: 'Department',
                    type: 'list',
                    message: 'What department does the role work in?',
                    choices: function() {
                        var deptArr = [];
                        for (let i = 0; i < res.length; i++) {
                            deptArr.push(res[i].dept_name);
                        }
                        return deptArr;
                    },
                }
            ]).then(function(ans) {
                let department_id;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].dept_name == ans.Department) {
                        department_id = res[i].id;
                    }
                }

                connection.query(
                    'INSERT INTO roles SET ?', {
                        title: ans.new_role,
                        salary: ans.salary,
                        department_id: department_id
                    },
                    function(err, res) {
                        if (err) throw err;
                        console.log('Your new role has been added!');
                        console.table('All Roles:', res);
                        intro();
                    })
            })
    });
};


function quitApp() {
    connection.end();
    console.log('Thanks for using the employee tracker, see you next time!')
}