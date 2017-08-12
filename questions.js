var database = require("./database.js");
var inquirer = require("inquirer");
var columnify = require('columnify');

var inquire_questions = {
    start: function() {
        inquirer
            .prompt([{
                    name: "WhatIsID",
                    type: "input",
                    message: "What is the ID of the item you would like to purchase?"
                },
                {
                    name: "HowMany",
                    type: "input",
                    message: "How many of this item would you like to purchase?"
                }
            ])
            .then(function(answer) {
                // console.log(' WHAT IS HAPPENING?', answer);
                // based on their answer, either call the bid or the post functions
                database.findItemQuantity(parseInt(answer.WhatIsID)).then(function(quantity) {
                    var qnty = quantity;
                    var howMany = parseInt(answer.HowMany)
                    // console.log("Qnty: "+qnty+", How many: "+howMany)
                    if (qnty && howMany >= qnty) {
                        console.log("Insufficient Quantity! We currently only have " + qnty + " instock.")
                        database.itemList().then(function(allProductInfo) {
                            var columns = columnify(allProductInfo, { columnSplitter: ' | ' });
                            console.log(columns);
                            inquire_questions.start();
                        }).catch((err) => {
                            console.warn("ERROR HUSTON: ", err);
                        })
                    } else {
                        database.subtractQuantity(answer.WhatIsID, answer.HowMany).then(function(results) {
                            // console.log(results);
                            console.log("You purchased " + answer.HowMany + " item(s). Thank you!");
                        });
                        database.totalCost(answer.WhatIsID, answer.HowMany).then(function(results) {
                            console.log("Your total comes to: $" + results)
                            console.log("Would you like to purchase more items?")
                            database.itemList().then(function(allProductInfo) {
                                var columns = columnify(allProductInfo, { columnSplitter: ' | ' });
                                console.log(columns);
                                inquire_questions.start();
                            }).catch((err) => {
                                console.warn("ERROR HUSTON: ", err);
                            })
                        });
                    }
                });
            })
    }
};

module.exports = inquire_questions