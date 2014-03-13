'use strict';

var gpio = require("gpio");

exports.startLed = function(req,res){
  console.log('[api.js] function startLed');
  console.log('pin ready');
  res.send(200,{ message: 'Ok' });
};


exports.stopLed = function(req,res){
  console.log('turn off a led ... ');
  console.log('pin ready');
  res.send(200,{ message: 'Ok' });
};