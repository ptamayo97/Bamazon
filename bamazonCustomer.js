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

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});


function start() {
    inquirer
        .prompt({
            name: "postOrBid",
            type: "rawlist",
            message: "Would you like to [BUY] an item or [EXIT]?",
            choices: ["BUY", "EXIT"]
        })
        .then((answer) => {
            if (answer.postOrBid.toUpperCase() === "BUY") {
                buyProduct();
            }
            else {
                connection.end();
            }
        });
}


function updateProducts() {
    console.log("\nProducts updated!\n");
    connection.query("\nSELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}


function buyProduct() {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "id",
                    message: "Enter the ID of the product you wish to buy."
                },

                {
                    type: "input",
                    name: "amount",
                    message: "Amount you wish to buy?"
                }
            ])
            .then((answer) => {

                var chosenItem = res[answer.id - 1];
                var userAmount = parseInt(answer.amount);
                var totalCost = parseFloat(chosenItem.price * userAmount.toFixed(2));


                if (chosenItem.stock_quantity < parseInt(userAmount)) {
                    console.log("\nnot enough in stock\n");
                    start();

                }
                else {
                    console.log("\nChosen Item: " + chosenItem.product_name, " || Price: $" + totalCost);

                    var inStock = chosenItem.stock_quantity;
                    // console.log("In Stock: " + inStock);
                    var newAmount = inStock - userAmount;
                    // console.log("New Amount: " + newAmount);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newAmount
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        (error) => {
                            if (error) throw err;
                            updateProducts();
                        }
                    );
                }
            });
    });
}







