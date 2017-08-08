var  database = require("./database.js");
var inquirer = require("inquirer");

var inquire_questions = {
	start: function () {
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
	    }])
	    .then(function(answer) {
				console.log(' WHAT IS HAPPENING?', answer);
	      // based on their answer, either call the bid or the post functions
	      var qnty = database.findItemQuantity(parseInt(answer.WhatIsID)).then(function(quantity){return JSON.stringify(quantity[0])})
	      console.log("this is the quantity instock: "+qnty);
	      if (qnty && answer.HowMany >= qnty) {
	        console.log("Insufficient Quantity!")
	        database.itemList();
			inquire.start();
	      }
	      else {
	        database.subtractQuantity(answer.WhatIsID, answer.HowMany);
	        database.totalCost(answer.WhatIsID, answer.HowMany);
	      }
	    });
	}
};

module.exports = inquire_questions
