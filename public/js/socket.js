// socket.js

// 'Globals'
var feed = new Queue( 50 );
var socket = io();

// Background Image
socket.on('reddit background', function(result) {
  
  for (var key in result) {
    if( !result.hasOwnProperty(key) ) { continue; }

    console.log( result[key]['data'].url );
    if( !feed.inQueue( result[key]['data'].url ) && !result[key]['data'].stickied ){
      result[key]['data'].source = "reddit";
      feed.enqueue( result[key]['data'].url );
      
      var url = result[key]['data'].url.replace("http://", "").replace("https://", "");
      var urlSplit = url.split(".");
      if( urlSplit[0] == "imgur"){
        url = "i." + url + ".jpg";
      }

      if( ["flickr.com", "500px.com"].contains(result[key]['data'].domain) ){

        $(".dashboard").css("background-image", "url('https://c2.staticflickr.com/2/1652/25532790890_6e8402551d_h.jpg')" );
      }
      else{
        $(".dashboard").css("background-image", "url('http://" + url + "')" );
      }

      var resultData = result[key]['data'];
      var altLink = "http://www.reddit.com" + String(resultData.permalink);
      altLink = formatURL(altLink);
      var icon = "<i class='fa fa-picture-o fa-2x fa-inverse' aria-hidden='true'></i>";
      var url = resultData.url;
      var title = resultData.title;
      feedItem(altLink, icon, url, title);
    }

  }
});

socket.on('new reddit news', function(result) {

  for (var key in result) {
    if( !result.hasOwnProperty(key) ) { continue; }
    
    console.log( result[key]['data'].url );
    if( !feed.inQueue( result[key]['data'].url ) && !result[key]['data'].stickied ){
      result[key]['data'].source = "reddit";
      feed.enqueue( result[key]['data'].url );

      var resultData = result[key]['data'];
      var altLink = "http://www.reddit.com" + String(resultData.permalink);
      altLink = formatURL(altLink);
      var icon = "<i class='fa fa-reddit-square fa-2x fa-inverse'></i> <span style='color: white'> /" + resultData.subreddit + " </span>";
      var url = resultData.url;
      var title = resultData.title;
      feedItem(altLink, icon, url, title);
    }

  }
});

socket.on('new hacker news', function(result) {

	for (var key in result) {
		if( !result.hasOwnProperty(key) ) { continue; }
		
    console.log( result[key].url );
		if( !feed.inQueue( result[key].url ) ){
      result[key].source = "hackernews";
			feed.enqueue( result[key].url );

      var resultData = result[key];
      var altLink = "http://news.ycombinator.com";
      altLink = formatURL(altLink);
      var icon = "<i class='fa fa-hacker-news fa-2x fa-inverse'></i>";
      var url = resultData.url;
      var title = resultData.title;
      feedItem(altLink, icon, url, title)
		}

	}

});

function newFeedItemDiv(item) {

  var htmlString = [
    "<div class='feed_item'>",
    "  <div class='row row-eq-height'>",
    "    <div class='col-xs-3'>",
    "      <a target='_blank' href=" + item.altLink.replace(/'/g, "") + "><span class='feed_icon'>" + item.icon + "</span></a>",
    "    </div>",
    "    <div class='col-xs-9' style='padding-left: 0px;'>",          
    "      <span class='feed_link'><a target='_blank' href=" + item.url + ">" + item.title + "</a></span>",
    "    </div>",
    "  </div>",
    "</div>"
  ].join("\n");
  var html = $(htmlString);
  html.prependTo( $('.feed_list') );

}

function formatURL(url) {
	if( url.charAt(url.length - 1) == "/") {
		return url.substring(0, url.length-1);
	}
	else {
		return url;
	}
}

Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

function feedItem(altLink, icon, url, title){
  this.altLink = "\"'" + altLink + "'\"";
  this.icon = icon;
  this.url = formatURL(url);
  this.title = title;
  newFeedItemDiv(this);
}

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 * number - the max number of items the queue will hold
 */
function Queue( number ){

  // initialise the queue and offset
  var queue  = [];
  var offset = 0;

  // Returns the length of the queue.
  this.getLength = function(){
    return (queue.length - offset);
  }

  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function(){
    return (queue.length == 0);
  }

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function(item){
    queue.push(item);
    if( this.getLength() > number ){
    	this.dequeue();
    }
  }

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function(){

    // if the queue is empty, return immediately
    if (queue.length == 0) return undefined;

    // store the item at the front of the queue
    var item = queue[offset];

    // increment the offset and remove the free space if necessary
    if (++ offset * 2 >= queue.length){
      queue  = queue.slice(offset);
      offset = 0;
    }

    // return the dequeued item
    return item;

  }

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function(){
    return (queue.length > 0 ? queue[offset] : undefined);
  }

  /* Returns boolean if item is in the queue */
  this.inQueue = function(item) {
  	return (queue.indexOf(item) > -1 );
  }

}


