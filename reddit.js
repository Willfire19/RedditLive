// reddit.js
var request = require('request');

var get_hot_reddit_items = function(number_items, subreddit, callback) {
	var reddit_items = {};
	var request_url = "https://www.reddit.com/r/" + subreddit + "/hot.json?limit=" + number_items;
	request(request_url, function (error, response, body) {
		// console.log("Response Code: " + response.statusCode);
		// console.log("Reddit error: ", error);
		if (!error && response.statusCode == 200) {
			reddit_items = JSON.parse(body)['data']['children'];

			if(typeof callback === "function"){
				// console.log("Successful Reddit Retrieval");
				callback( null, reddit_items );
			}
			
		} else {
			if(typeof callback === "function"){
				// console.log("Reddit is Unknown error");
				callback( error, reddit_items );
			}
		}
	});
}

var get_front_reddit_items = function(number_items, callback) {
	var reddit_items = {};
	var request_url = "https://www.reddit.com/hot.json?limit=" + number_items;
	request(request_url, function (error, response, body) {
		// console.log("Response Code: " + response.statusCode);
		// console.log("Reddit error: ", error);
		if (!error && response.statusCode == 200) {
			reddit_items = JSON.parse(body)['data']['children'];

			if(typeof callback === "function"){
				// console.log("Successful Reddit Retrieval");
				callback( null, reddit_items );
			}
			
		} else {
			if(typeof callback === "function"){
				// console.log("Reddit is Unknown error");
				callback( error, reddit_items );
			}
		}
	});
}

module.exports.get_hot_reddit_items = get_hot_reddit_items;
module.exports.get_front_reddit_items = get_front_reddit_items;