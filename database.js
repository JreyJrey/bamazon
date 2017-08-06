var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  // start();
});

var queries = {

  itemList: function(){
    // return a new Promise so that you can then chain a thenable on your bamazon
    // file and call inquire.
    return new Promise(function(resolve, reject) {
      connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // console.log(results);
        else if (!results){
          console.log("No Results")
        }
        else if(results){
          // no need to loop through results,
          // we can just resolve them topside to bamazon and
          // spit out the table with columnify
          resolve(results);
        }
      })
    })
  },
  Product: function(results){
    this.id = results.id;
    this.product_name = results.name;
    this.department_name = results.department_name;
    this.price = results.price;
    this.quantity = results.quantity;
    // console.log(this);
  },

  findItemQuantity: function(id){
    connection.query("SELECT * FROM products where id = " + id, function(err, results) {
      if (err) throw err;
      return results.quantity
    })},

  subtractQuantity: function(id, qnty){
    connection.query("Update products set quantity = (quantity -"+qnty+") where id = "+id, function(err, results) {
      if (err) throw err;
    })
  },

  totalCost: function(id, qnty){
    connection.query("Select price from products where id = "+id, function(err, results) {
      if (err) throw err;
      var totalPrice = (results.price * qnty);
      console.log(totalPrice)
    })
  }

}

module.exports = queries
