var fs = require('fs');



function handle(callback){
	console.log('[readFile.js]');

	//fs.readFile('/etc/hosts', 'utf8', function (err,data) {
	fs.readFile('./public/newsletter.html', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
//	    callback(err);
	  }

	  console.log(data);
	  callback(data);
	});
}


exports.handle=handle;
