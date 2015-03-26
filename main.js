var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs = require('fs')
var app = express()
var recent = [];             // queue for storing the URL's
var pictures = "images";     // list for storing images

// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})

///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.
app.use(function(req, res, next) 
{
	console.log(req.method, req.url);   
    /* create the URL  */
    var url = 'http://'+server.address().address+':'+server.address().port+req.url;
    /* code for inserting into queue */
    client.lpush(recent,url);        // store the URL
    client.ltrim(recent,0,4);        // get the recent 5 URL's
	next();                          // Passing the request to the next handler in the stack.
});
app.use('/uploads', express.static(__dirname+'/uploads'));

app.get('/recent', function(req, res){
      client.lrange(recent, 0, 4, function(err, top5){                        // get the top 5 recent URL's and store in top5 variable
      var result='The top five recent requests to this server are: <br>';
      for (var i = 0; i < top5.length; i++) {                                 // iterate through all the URL's
        result = result + "("+(i+1) +') '+ top5[i] +" <br>";                  // Append the URL to string result
        result = result +"\n";                                               
      }
      res.send(result);                                                       // send the response
  })
});

app.get('/set', function(req,res){
    client.set("self-destruct","This message will self-destruct in 10 seconds !");
    client.expire("self-destruct", 10);
    res.send("The key is set. It will expire in 10 seconds !");
})
app.get('/get', function(req,res){
   client.get("self-destruct", function(err,value){
       if(value==null || value == undefined)       // if the key is expired
           res.send("Key has expired !");
       else
           res.send(value)});
})

app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
    //console.log(req.body) // form fields
    //console.log(req.files) // form files
    
    if( req.files.image )
    {
 	   fs.readFile( req.files.image.path, function (err, data) {
 	  		if (err) throw err;
 	  		var img = new Buffer(data).toString('base64');
 	  		console.log(req.files.image.path);
            client.rpush("pictures",req.files.image.path);                // push the images to the queue
 		});
 	}

    res.status(204).end()
 }]);

 app.get('/meow', function(req, res) {
 	{
 		client.lpop("pictures", function(err,data)                            // pop the images from the queue
		{
			console.log(data);
			res.writeHead(200, {'content-type':'text/html'});                 // get html page
			res.write("<h1>\n<img src='"+data+"'/></h1>");                    // write the image to the html content
			res.end();                                                        
		});
 	}
 })

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
})
// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
})


// HTTP SERVER
 var server = app.listen(3000, function () {

   var host = server.address().address
   var port = server.address().port

   console.log('Example app listening at http://%s:%s', host, port)
 })
 // Additional Instance of Server on Port 3001
 // This server is not used in the application. It is only used to demonstrate how to create and run a server on a port
  var server2 = app.listen(3001, function () {                            

   var host = server2.address().address
   var port = server2.address().port

   console.log('Example app listening at http://%s:%s', host, port)
 })