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
    }
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

}(window));
