/* ===================================================
 * app.js
 * ------
 * Namespace decalration, localization and settings
 * @dependencies: none
 * @author: Pierre Cholhot <pierre.cholhot@digitas.fr>
 * =================================================== */

(function (window) {

  /* APP DEFINITION
   * ============== */
  var App = {
    settings: {},
    l10n: {
      random: {}
    },
    socket: {}
  };


  /* APP SETTINGS
   * ============ */

  App.settings.debug = true;


  /* APP LOCALIZATION VARIABLES
   * ========================== */

  App.l10n.random.close = 'Fermer';


  /* EXPOSE APP
   * ========== */

  window.App = App;

  
  
 // $(document).ready(function() {
    
    var socket;
    setTimeout(function() {
      window.console.log("[Led project starting]");
      socket = io.connect('http://192.168.2.2:3000/');
      
      socket.on('message', function (data) {
        window.console.log(data);
        //socket.emit('my other event', { my: 'data' });
        if(data.ledState){
          window.document.getElementById('ledState').classList.remove('label-danger');
          window.document.getElementById('ledState').classList.add('label-success');
        }else{
          window.document.getElementById('ledState').classList.remove('label-success');
          window.document.getElementById('ledState').classList.add('label-danger');          
        }
      });


    }, 1000);


    setTimeout(function() {
      window.console.log("[Start Led]");
      socket.emit('startLed', { my: 'data' });
    }, 3000);

    setTimeout(function() {
      window.console.log("[Stop Led]");
      socket.emit('stopLed', { my: 'data' });
    }, 9000);
  //});
}(window));
