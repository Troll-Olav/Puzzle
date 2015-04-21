var fs = require('fs');
var url = require('url');
var Hapi  = require('hapi');
var server  = new Hapi.Server();
var Path  = require('path');
var index = Path.resolve(__dirname + '/public/index.html');
console.log(index);

server.connection({
  port: process.env.PORT || 8000,
    host: "0.0.0.0" || "localhost"
});


server.route([ 
  {
    method: 'GET',
    path: '/',
    handler: function(request,reply){
      reply.file(index);
    }
  }, {
        // for serving static files
    path: '/{param*}',
    method: 'GET',
    handler: {
          directory: {
            path: Path.resolve(__dirname + '/public'),
            index: true
          }
    }
  }

]);


server.start(function(){
  console.log('server running at port 8000');
});

