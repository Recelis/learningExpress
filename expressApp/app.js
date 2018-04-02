
// include the Node HTTP library
var http = require("http");
// include the Express module
var express = require("express");
// create instance of express
var app = express();

//set the view engine
app.set('view engine', 'jade');
// where to find view files
app.set('views', './views');

//route for the home page - will render a view
app.get("/", function(req, res){
    res.render("index");
});

//route for say-hello will render a view
app.get('/say-hello', function(req, res){
    res.render('hello');
});

app.get('/test', function(req, res){
    res.render('test');
});

app.use(express.static('./public'));

// start the app
http.createServer(app).listen(3000, function(){
    console.log("express app started");
})

