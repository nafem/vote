var fs = require('fs');
url = require('url')

var server = require('http').createServer(function(req, response){
	var path = "mobile"
	if(req.method=='GET') {
        var url_parts = url.parse(req.url,true);
       // console.log(url_parts.query);
		if(url_parts.query["path"]){
		path = url_parts.query["path"];
		}
    }

  fs.readFile(__dirname+'/'+path+'.html', function(err, data){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.write(data);
    response.end();
  });
});
server.listen(8080);
var nowjs = require("now");
var everyone = nowjs.initialize(server);
var yes = 0;
var no = 0;
var percent = 0;

nowjs.on("connect", function(){
  console.log("Joined: ");
  this.now.receiveMessage(yes, no);
});

nowjs.on("disconnect", function(){
  console.log("Left: ");
});


everyone.now.distributeMessage = function(message){
 console.log("Vote: "+message);

if(message == "Yes"){
yes++;
} else if(message == "No") {
no++;
} else {
yes = 0;
no = 0;
}

  everyone.now.receiveMessage(yes, no);
};