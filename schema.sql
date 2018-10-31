DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 4) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("monitor", "electronics", 300, 500),
("keyboard", "electronics", 100, 750),
("t-shirt", "clothing", 20, 1000),
("desk", "furniture", 250, 500),
("large sofa", "furniture", 800, 100),
("small sofa", "furniture", 400, 200),
("pants", "clothing", 60, 775),
("eggs", "food", 2.20, 2000),
("milk", "food", 2.50, 1500),
("sweaters", "clothing", 40, 400);


