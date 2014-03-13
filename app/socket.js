'use strict';


var io=require('socket.io');

var ClientsCollection = new Array();


var api = require('./api.js');

//introducing realtime update

function getAccountHotSpot(){
    //console.log('[getAccountHotSpot] current spotnumber: '+numberOfSpots);
}
//////////////////////////////






function activate(http_server){
  io=io.listen(http_server);  
  io.set('log level', 1);
  var allClients=0;
  var idClient=1;

//heroku stuff
  io.configure(function () { 
    io.set("transports", ["xhr-polling"]); // EXIGE PAR HEROKU La méthode Http long polling est imposée, pas d'alternatives
    io.set("polling duration", 10); // EXIGE PAR HEROKU une nouvelle requête du client est ré-émise toutes les 10 sec
    io.set("close timeout",15);
  });

  
  //ensure that the led is off
  api.stopLed();
  var ledState=false;

  //On each connection from a client
  io.sockets.on('connection', function (client) {

    

    allClients+=1;
    console.log("\n["+(new Date()).toISOString()+"][socket_server.js] New connection");
    console.log("[socket_server.js] current clients number: "+allClients);
    //console.log((JSON.stringify(client)));  
    //fixer un identifiant au client
  

    var my_client={"id":idClient,"obj":client};//,"privateKey":privateKey};
    idClient+=1;


    my_client.my_timer = setInterval(function () {
      var msg={"timestamp": (new Date()).getTime(),"connectedClients": allClients,"ledState":ledState};
      console.log('[socket_server.js] message : '+JSON.stringify(msg));
      //my_client.obj.send(msg); 
      my_client.obj.emit('message', msg);
    }, 1000);


    client.on('startLed', function() {
      ledState=true;
      api.startLed();
    });

    client.on('stopLed', function() {
      ledState=false;
      api.stopLed();
    });

      //if the client disconnect
      client.on('disconnect', function() {
          allClients -= 1;
      console.log("[socket_server.js] client id: "+my_client.id+" disconnected");
        console.log("[socket_server.js] current clients number: "+allClients);
        //clear the timer
        //clearTimeout(ClientsCollection[client.id]);
          //clearTimeout(my_timer); 
          clearTimeout(client.my_timer);
          console.log('disconnect'); 
      }); 
  });
}


exports.activate = activate;
