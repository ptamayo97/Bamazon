var mysql = require("mysql");
var inquirer = require("inquirer")
require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect( function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
}

