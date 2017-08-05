var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var database = require("./database.js");
var inquire = require("./questions.js")

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



database.itemList();


setTimeout(function(){ inquire.start(); }, 1000);







