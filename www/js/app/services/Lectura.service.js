/**
 *@file SoapClient.js
 * Cliente que consume el servicio de lectura de informacion de un activo.
 */

var LecturaService = Ember.Object.extend({
  /**
   * Función que se encarga de relizar el llamado al web service
   * @return Respuesta del web service
   */
  callService: function(tag) {
    var DEV = 'http://controlid.co/activos';
    var webServiceURL = DEV + '/web/app_dev.php/ws/infoActivo';

    var soapMessage =
      '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><leerActivo xmlns="http://controlid/ws/infoActivo/1.0/"><tag>' +
      tag + '</tag></leerActivo></soap:Body></soap:Envelope>';
    var soapClient = SoapClient.create({
      url: webServiceURL,
      message: soapMessage
    });
    var result = soapClient.callService();
    /*
     * Significa que se genera algún tipo de error al intentar llamar al
     * web service.
     */
    if (result.data == false) {
      console.log(result.message);
      if (result.message == 'NETWORK_ERR') {
        return false;
      }
    } else {
      var message = $(result.data).find('return').text();
      console.log(message);
      return JSON.parse(message);
    }
  },
});
