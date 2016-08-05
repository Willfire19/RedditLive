var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var reddit = require('./reddit');

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function( req, resp ) {

	resp.render('pages/index');

});

io.on('connection', function(socket) {
	
	console.log('a user connected');

	// io.emit('reddit background', "");
	reddit.get_hot_reddit_items( 1, "EarthPorn", function( err, result ) {
		if( err ){
			console.log(err);
		}
		else {
			io.emit('reddit background', result);
		}
	});

	reddit.get_front_reddit_items( 25, function( err, result ) {
		if( err ){
			console.log("Error: " + err);
		}
		else {
			// console.log(result);
			io.emit('new reddit news', result);
		}
	});

	// reddit.get_hot_reddit_items( 1, "oculus", function( err, result ) {
	// 	if( err ){
	// 		console.log("Error: " + err);
	// 	}
	// 	else {
	// 		// console.log(result);
	// 		io.emit('new reddit news', result);
	// 	}
	// });

	// reddit.get_hot_reddit_items( 1, "vive", function( err, result ) {
	// 	if( err ){
	// 		console.log("Error: " + err);
	// 	}
	// 	else {
	// 		// console.log(result);
	// 		io.emit('new reddit news', result);
	// 	}
	// });

	// reddit.get_hot_reddit_items( 1, "nfl", function( err, result ) {
	// 	if( err ){
	// 		console.log("Error: " + err);
	// 	}
	// 	else {
	// 		// console.log(result);
	// 		io.emit('new reddit news', result);
	// 	}
	// });

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	setInterval(function() {
  	console.log("Starting continuous interval call");

  	reddit.get_hot_reddit_items( 1, "EarthPorn", function( err, result ) {
			if( err ){
				console.log(err);
			}
			else {
				io.emit('reddit background', result);
			}
		});

		reddit.get_hot_reddit_items( 25, function( err, result ) {
			if( err ){
				console.log("Error: " + err);
			}
			else {
				// console.log(result);
				io.emit('new reddit news', result);
			}
		});

  // 	reddit.get_hot_reddit_items( 3, "oculus", function( err, result ) {
		// 	if( err ){
		// 		console.log("Error: " + err);
		// 	}
		// 	else {
		// 		// console.log(result);
		// 		io.emit('new reddit news', result);
		// 	}
		// });

		// reddit.get_hot_reddit_items( 3, "vive", function( err, result ) {
		// 	if( err ){
		// 		console.log("Error: " + err);
		// 	}
		// 	else {
		// 		// console.log(result);
		// 		io.emit('new reddit news', result);
		// 	}
		// });

		// reddit.get_hot_reddit_items( 3, "nfl", function( err, result ) {
		// 	if( err ){
		// 		console.log("Error: " + err);
		// 	}
		// 	else {
		// 		// console.log(result);
		// 		io.emit('new reddit news', result);
		// 	}
		// });

	}, 300000);

});

http.listen( process.env.PORT || 3000, function() {
	console.log('RedditLive listening on *:3000');
});