var redis = require('redis')
var http = require('http')
var httpProxy = require('http-proxy')
var proxyServer = require('http-route-proxy');


var number = Math.floor((Math.random() * 10) + 1); // generates a random number between 1 and 10

if(number>5){                                     // if number is greater than 5 then redirect to 3001
proxyServer.proxy([
    {
        
        from: 'localhost:3000',
        to: 'localhost:3001'
    }
]);
}
else{                                            // if number is greater than 5 then redirect to 3002
    proxyServer.proxy([
    {
        
        from: 'localhost:3000',
        to: 'localhost:3002'
    }
]);
}