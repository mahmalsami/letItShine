/*global require process __dirname console*/


// Default modules
var express = require('express');
var path = require('path');
var routes = require('./routes');
var app = express();

// Mail add-on module
var mailServer = require('./mailServer');
var readFile = require('./readFile');


var port = process.env.PORT || 3000;

// Default configuration
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('app-name secret here'));
app.use(express.session());
app.use(app.router);
app.use(express['static'](path.join(__dirname, '../public')));
app.locals.pretty = false;
app.locals.pagination = false;


// Development configuration
if ('development' === app.get('env')) {
  app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
  }));
  app.locals.pretty = true;
}


// Default Routes
app.get('/', routes.index);
app.get('/index.html', routes.index);
app.get('/styleguide.html', routes.styleguide);


// Routes
app.get('/home.html', routes.home);




//Webservice
app.get('/emailing/:userEmail', function(req,res) {
	//mailServer.sendMail(req,res,'ahahahhahahahah');

	function callback(htmlContent){
		console.log(htmlContent);
		mailServer.sendMail(req,res,htmlContent);
	}

	readFile.handle(callback);

});


//Webservice
app.get('/readFile', function(req,res) {
	/*
	console.log(JSON.stringify(req.body));
	console.log(JSON.stringify(req.params));
	*/
	readFile.handle(req,res);
});






// Initialization
app.listen(port, function () {
  console.log("Made app running on port " + port);
});
