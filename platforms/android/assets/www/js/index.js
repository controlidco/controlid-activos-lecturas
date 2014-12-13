
App.deferReadiness();
document.addEventListener('deviceready', function() 
{
    App.advanceReadiness();
    //cuando se oprime el boton atrás 
    document.addEventListener("backbutton",function(e)
    {
         e.preventDefault();
         navigator.notification.confirm(
                 "Deseas salir de la aplicación?", 
                 function(button){
                    if(button==2){//If User selected No, then we just do nothing
                        return;
                    }else{
                        navigator.app.exitApp();// Otherwise we quit the app.
                    }
                 }, 
                 "Confirmación", 
                 [ 'Si','No'],
                 'Done'
         ); 
       

    }, false);
});
