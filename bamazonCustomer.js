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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});

function readProducts() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        // connection.end();
        inquirer.prompt([
            {
                type: "input",
                name: "item_id",
                message: "Enter the ID of the product you wish to buy."
            },

            // {
            //     type: "confirm",
            //     message: "Are you sure:",
            //     name: "confirm",
            //     default: true
            // },

            {
                type: "input",
                name: "amount",
                message: "Amount you wish to buy?"
            }

            // {
            //     type: "confirm",
            //     message: "Are you sure:",
            //     name: "confirm",
            //     default: true
            // }
        ])
            .then(function (response) {
                // if (response.confirm) {
                //     console.log("items purchased")
                //     buyProduct(response.item_id, response.amount);
                // }
                var chosenItem = response.item_id;

                if (chosenItem.stock_quantity > parseInt(response.amount)) {
                    var newAmount = chosenItem.stock_quantity - response.amount;
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newAmount
                            },
                            {
                                item_id: chosenItem
                            }
                        ],
                        function (err, res) {
                            if (error) throw err;
                            console.log(res.affectedRows + " products updates!\n");
                        }
                    );
                }
                else {
                    console.log("notenough in stock");
                    readProducts();

                }

            });
    });
}

// function buyProduct(id, amount) {
//     console.log("Updating database");
//     var query = connection.query(
//         "UPDATE products SET ? WHERE ?",
//         [
//             {
//                 stock_quantity: stock_quantity - amount
//             },
//             {
//                 item_id: id
//             }
//         ],
//         function(err, res) {
//             console.log(res.affectedRows + " products updates!\n");
//         }
//     );
//     console.log(query.sql);
// }



