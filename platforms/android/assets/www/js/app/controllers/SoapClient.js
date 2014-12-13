/**
 *@file SoapClient.js
 * Cliente que se encarga de consumir un web service SOAP.
 */

var SoapClient = Ember.Object.extend({
  /**
   * Función que se encarga de relizar el llamado al web service
   * @return Respuesta del web service
   */
  callService: function() {
    var ret = {
      data: false,
      message: ''
    };
    $.ajax({
      url: this.get('url'),
      type: "POST",
      data: this.get('message'),
      async: false,
      contentType: "application/soap+xml; charset=utf-8",
      dataType: "xml",
      success: function(data) {
        ret.data = data;
      },
      error: function(request, status, error) {
        console.error(request);
        console.error(status);
        console.error(error);
        try {
          ret.message = error.message.split(':')[0];
        } catch (error) {
          ret.message = error.message;
        }
        //ret.message = error.message.split(':')[0];
      },
    });
    return ret;
  },
});
