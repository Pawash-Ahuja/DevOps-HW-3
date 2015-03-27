DevOps - HW#3
===================
Submitted By:

 - Nikhil Katre (nkatre@ncsu.edu)
 
Submission: HW3 <br>
Link To HW#3: [HW#3](https://github.com/nkatre/DevOps-HW-3)<br>
Link To Original Queues Repository: [Queues](https://github.com/CSC-DevOps/Queues)


Applications Installed
-------------
Following applications are required to demonstrate solution: <br>
 1. [Redis](http://redis.io/) 
 2. [Express](http://expressjs.com/)
 3. [npm](https://www.npmjs.com/)


Evaluation
-------------

**HW#3** is evaluated based on the following

- Complete set/get 50%
- Complete recent 75%
- Complete upload/meow 85%
- Additional service instance running: 90%
- Demonstrate proxy: 100%

----------

I. Set/Get
-------------------

For SET the following is done:

 1. Use `redis` to set the key and value at the client
 2. Use `redis.expire` to set the expiry for the key
 3. Send a response that the key is set and that it will expire in 10 seconds
 4. Set Demo
 ![Set](https://github.com/nkatre/DevOps-HW-3/blob/master/outputImages/set.png)

For GET the following is done:

 1. Get the value at the key using `redis`
 2. Check if the value is undefined or null indicating that the key is expired
 3. If the value exists than send the value in the response
 4. Get Before 10 seconds
 ![Get Before Expiration](https://github.com/nkatre/DevOps-HW-3/blob/master/outputImages/get_under_10.png)
 5. Get After 10 seconds
 ![Get After Expiration](https://github.com/nkatre/DevOps-HW-3/blob/master/outputImages/get_after_10.png)

----------

II. Recent
-------------

 1. We achieve this by adding few LOC in `app.use`
 2. We create a queue and push all the visited links to this queue using `lpush` command<br>
 3. We trim this queue using `ltrim` command to get top 5 recently visited URL's<br>
 4. Now we create a get method called `recent` to get top 5 recently visited URL's
 5. In this method, we append all the URL's to a string and this string is then returned as a response using `res.send()`
 6. Top 5 Recently Visited URL's Demo
 ![Recent Demo](https://github.com/nkatre/DevOps-HW-3/blob/master/outputImages/recent.png)


----------

III. Upload/Meow
--------------------

 1. The `upload` method will be used to upload the images to the web server in `uploads` directory of the server
 2. The `meow` method will be used to access these uploaded images
 3. First we will statically bind the `uploads` directory address to upload and access the stored images, 
>  app.use('/uploads', express.static(__dirname+'/uploads'))
 4.  In the `uploads` method, we will use a list and push the image path to this list using `rpush` command
 5. In the `meow` method, we will pop the image path using `lpop` command and then use ***`<img></img> tag`*** of html to retrieve this image using the image path and ***`src attribute`*** of ***`<img> tag`***
 6. Upload/Meow Demo
 - In the command line use the following command to upload an image

     *curl -F "image=@./img/morning.jpg" localhost:3000/upload*
![Curl Command](https://github.com/nkatre/DevOps-HW-3/blob/master/outputImages/commandLine.png)
![Upload Confirmation](https://github.com/nkatre/DevOps-HW-3/blob/master/outputImages/CommandLineUploads.png)
 - Use the web browser to call `meow` method which gives following output
![Meow Output](https://github.com/nkatre/DevOps-HW-3/blob/master/outputImages/meow.png)
 
----------

IV. Additional server instance running
--------------------

 To demonstrate this, I have created an additional server running on port 3001, using the following code 

     var server2 = app.listen(3001, function () {                            
    
       var host = server2.address().address
       var port = server2.address().port
    
       console.log('Example app listening at http://%s:%s', host, port)
     })

- Demo
![Both Servers](https://github.com/nkatre/DevOps-HW-3/blob/master/outputImages/bothServers.png)
![3001 Server](https://github.com/nkatre/DevOps-HW-3/blob/master/outputImages/additionalServer.png)
![3000 Server](https://github.com/nkatre/DevOps-HW-3/blob/master/outputImages/additionalServer1.png)
 ----------

V. Proxy Server
--------------------
We can retrieve the status of any build if we know two parameters:<br>

 1. `IP Address` or `Computer Name`
 2. `Port Number` on which Jenkins is running

For Example:  The name of my computer is set as`nkatre-Inspiron-3521` and the port number on which Jenkins is running is `8080`<br>

Thus, the status of any build can be accessed by any machine in the network via the following URL:<br>
[http://nkatre-inspiron-3521:8080/job/WebGoat/19/](http://nkatre-inspiron-3521:8080/job/WebGoat/19/ "http://nkatre-inspiron-3521:8080/job/WebGoat/19/")<br>
The above URL will show the status of build #19<br>

**The following steps are followed to check status via http**

 1. Goto `Manage Jenkins` > `Configure System`
 2. In `Jenkins Location`, set the `Jenkins URL` as [http://computer-name:8080/](http://computer-name:8080/ "http://computer-name:8080/") <br>
	 For Example: In my case it is [http://nkatre-Inspiron-3521:8080/](http://nkatre-Inspiron-3521:8080/ "http://nkatre-Inspiron-3521:8080/")
 3. The below figure shows the settings
   ![statusSettings](https://github.com/nkatre/DevOpsProject/blob/master/Images/status1.png) 
 4. Now to check the status of any previous builds, enter the following URL in the web browser [http://nkatre-inspiron-3521:8080/job/WebGoat/19/](http://nkatre-inspiron-3521:8080/job/WebGoat/19/ "http://nkatre-inspiron-3521:8080/job/WebGoat/19/")
This will show the status of build #19
![StatusOfBuild#19ViaHTTP](https://github.com/nkatre/DevOpsProject/blob/master/Images/build%2319.png)

	 

