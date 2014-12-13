/*
 *@file RegistroController.js
 */

App.IndexController = Ember.ObjectController.extend({
  content: {},
  message: false,
  error: false,
  info: false,
  render: false,
  propietario: '',
  descripcion: '',
  marca: '',
  serial: '',
  init: function() {
    /*
     * Se verifica que el dispositivo tenga activado NFC, para
     * pode llevar a cabo de manera correcta las demas funcionalidad
     */
    var self = this;
    nfc.addTagDiscoveredListener(


      function(nfcEvent) {
        self.set('render', false);
        self.set('error', false);
        var tag = nfcEvent.tag;
        var tagNFC = nfc.bytesToHexString(tag.id);
        console.log(tagNFC);
        var lecturaService = new LecturaService();
        var result = lecturaService.callService(tagNFC);
        console.log(result.status);
        if (result != false) {

          if (Ember.isEqual(result.status, 'private')) {
            self.set('error', true);
            self.set('errorMessage', 'El activo es privado');
          }
          if (Ember.isEqual(result.status, 'success')) {
            self.set('render', true);
            self.set('propietario', result.activo.propietario);
            self.set('descripcion', result.activo.descripcion);
            self.set('serial', result.activo.serial);
            self.set('marca', result.activo.marca);
          }
          if (Ember.isEqual(result.status, 'error')) {
            self.set('error', true);
            self.set('errorMessage',
              'El chip no ha sido proporcionado por ControlID');
          }
        } else {
          self.set('error', true);
          self.set('errorMessage', 'Error de conexión');
        }
      },
      function(status) {},
      function(error) {
        if (error === "NO_NFC") {
          alert("El dispositivo no tiene NFC.");
        } else if (error === "NFC_DISABLED") {
          self.set('render', false);
          alert(
            "El NFC del dispositivo esta desactivado, por favor activelo "
          );
          self.set('render', false);
          self.set('error', true);
          self.set('errorMessage',
            'El NFC del dispositivo esta desactivado, por favor activelo'
          );
        } else {
          alert("There was a problem " + error);
        }
      } //endif error

    ); //endif nfc.discoverListerne
  }, //endif init

});
