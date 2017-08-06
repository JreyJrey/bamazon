var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var database = require("./database.js");
var inquire = require("./questions.js")
var columnify = require('columnify');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

app.listen(PORT, function() {
    // console.log("App listening on PORT " + PORT);
});


// now database.itemList() returns a Promise which allows to do
// the thenable and we have some async control flow now possible :)
database.itemList().then(function(allProductInfo) {
  var columns = columnify(allProductInfo, { columnSplitter: ' | '});
  console.log(columns);
  inquire.start();
})


// setTimeout(function(){ inquire.start(); }, 1000);
