'use strict';

var gpio = require("gpio");


exports.startLed = function(){
  console.log('[api.js] function startLed');
  var gpio17 = gpio.export(17,{
    direction : 'out',
    interval: 200,
    ready : function() {
      console.log('pin ready');
      res.send(200,{ message: 'Ok' });

      var intervalTimer= setInterval(function() {
        gpio17.set();
        //setTimeout(function() { gpio17.reset(); },500);
      }, 1000);

    }
  });

};

exports.stopLed = function(){
  console.log('[api.js] function stopLed');
  
    var gpio17 = gpio.export(17,{
    direction : 'out',
    interval: 200,
    ready : function() {
      console.log('pin ready');
      gpio17.reset();
    }
  });
};


exports.apiStartLed = function(req,res){
  console.log('[api.js] function startLed');
  //.json(result);

  var gpio17 = gpio.export(17,{
    direction : 'out',
    interval: 200,
    ready : function() {
      console.log('pin ready');
      res.send(200,{ message: 'Ok' });

      var intervalTimer= setInterval(function() {
        gpio17.set();
        //setTimeout(function() { gpio17.reset(); },500);
      }, 1000);

    }
  });

};


exports.apiStopLed = function(req,res){
  console.log('turn off a led ... ');
  
  var gpio17 = gpio.export(17,{
    direction : 'out',
    interval: 200,
    ready : function() {
      console.log('pin ready');
      gpio17.reset();
      res.send(200,{ message: 'Ok' });
    }
  });
};