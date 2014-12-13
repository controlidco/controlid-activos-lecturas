/**
 * Clase que se encarga de encriptar/desencriptar la información de los web services.
 */
var EDecryptor = Ember.Object.extend({

  decrypt: function(ecrypted) {
    return atob(atob(atob(ecrypted)));
  },

  encrypt: function(text) {
    return btoa(btoa(btoa(text)));
  }

});
