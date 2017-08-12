var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    
});
//Database queries in an object:
var queries = {

    itemList: function() {
        // return a new Promise so that you can then chain a thenable on your bamazon
        // file and call inquire.
        return new Promise(function(resolve, reject) {
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) reject(err);
                // console.log(results);
                else if (!results) {
                    console.log("No Results")
                } else if (results) {
                    // no need to loop through results,
                    // we can just resolve them topside to bamazon and
                    // spit out the table with columnify
                    resolve(results);
                }
            })
        })
    },

    //Was a constructor, but Not in use since I am using Columnify now.
    Product: function(results) {
        this.id = results.id;
        this.product_name = results.name;
        this.department_name = results.department_name;
        this.price = results.price;
        this.quantity = results.quantity;
        // console.log(this);
    },
    //Find how many of a specific item are in stock.
    ///I am using a promise here so that the rest of my code does not run, until I get results:
    findItemQuantity: function(id) {
        // console.log("findItemQuantity function ID passed: "+id)
        return new Promise(function(resolve, reject) {
            connection.query("SELECT quantity FROM products where products.id = " + id, function(err, results) {
                if (err) reject(err);
                // console.log(results);
                else if (!results) {
                    console.log("No Results")
                } else if (results) {
                    // console.log(parseInt(results[0].quantity))
                    resolve(parseInt(results[0].quantity));
                }
            })
        })
    },
    //Update MySQL by subtracting the quantity purchased.
    subtractQuantity: function(id, qnty) {
        return new Promise(function(resolve, reject) {
            // console.log(id);
            connection.query("Update products set quantity = (quantity -" + qnty + ") where id = " + id, function(err, results) {
                if (err) reject(err);
                // console.log(results);
                else if (!results) {
                    console.log("No Results")
                } else if (results) {

                    resolve(results);
                }
            })
        })
    },
    //Calculate total cost(number of items purchased * item price)
    totalCost: function(id, qnty) {
        return new Promise(function(resolve, reject) {
            // console.log(id);
            connection.query("Select price from products where id = " + id, function(err, results) {
                if (err) reject(err);
                // console.log(results);
                else if (!results) {
                    console.log("No Results")
                } else if (results) {
                    // console.log(results)
                    var totalPrice = (parseInt(results[0].price) * qnty);

                    resolve(totalPrice);
                }
            })
        })
    },

}

module.exports = queries

