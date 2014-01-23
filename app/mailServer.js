//var nodemailer = require('../lib/nodemailer');

console.log('[mailServer] launching mailServer');
var nodemailer = require('nodemailer');



// Create a SMTP transport object
var transport = nodemailer.createTransport("SMTP", {
        //service: 'Gmail', // use well known service.
                            // If you are using @gmail.com address, then you don't
                            // even have to define the service name
        auth: {
            user: "digitas.dummy@gmail.com",
            pass: "dummyDigitas2014"
        }
    });

console.log('SMTP Configured');














function sendMail(req,res,content) {
    console.log('[mailServer.js]');

    var userEmail = req.params.userEmail;

// Message object
var message = {

    // sender info
    from: 'Digitas Lbi <newsletter@digitas.fr>',

    // Comma separated list of recipients
    //to: '"Receiver Name" <nodemailer@disposebox.com>',
    to: '"Receiver Name" <'+userEmail+'>',

    // Subject of the message
    subject: 'NewsLetter Module', //

    headers: {
        'X-Laziness-level': 1000
    },

    // plaintext body
    text: 'Hello to myself!',

    // HTML body
    /*
    html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
         '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@node"/></p>',
    */
    html:content.toString(),

/*
    // An array of attachments
    attachments:[

        // String attachment
        {
            fileName: 'notes.txt',
            contents: 'Some notes about this e-mail',
            contentType: 'text/plain' // optional, would be detected from the filename
        },

        // Binary Buffer attachment
        {
            fileName: 'image.png',
            contents: new Buffer('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                                 '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                                 'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC', 'base64'),

            cid: 'note@node' // should be as unique as possible
        },

        // File Stream attachment
        {
            fileName: 'nyan cat ✔.gif',
            filePath: __dirname+"/nyan.gif",
            cid: 'nyan@node' // should be as unique as possible
        }
    ]
*/
};



    console.log('[mailServer.js] Sending Mail to: '+userEmail);
    transport.sendMail(message, function(error){
        if(error){
            console.log('[mailServer.js] Error occured');
            console.log(error.message);
            res.status(500).json({error:1});
            return;
        }
        console.log('[mailServer.js] Message sent successfully!');
        res.send(200);
        // if you don't want to use this transport object anymore, uncomment following line
        //transport.close(); // close the connection pool
    });
}

exports.sendMail=sendMail;