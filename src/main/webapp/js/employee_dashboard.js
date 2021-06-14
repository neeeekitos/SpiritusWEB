(function(namespace, $, undefined) {

    namespace.hello = function () {
        alert("hello world");
    }

    $(document).ready( function () {
        $.ajax({
         url: 'ActionServlet',
         method: 'POST',
         data:{
             todo:'getEmployeeHomePageInfosAction'
         },
         dataType:'json'
     })
      .done(function(response){
         var person = response.person;
         console.log(person);
     })
     .fail( function (error) { // Appel KO => erreur technique à gérer
         console.log('Erreur:', error); // LOG sur la Console Javascript
         alert('Erreur lors du chargement des données: HTTP Code ' + error.status); // Popup d'erreur
     });
        
    });

}) (window.SpiritusAccountCreation = window.SpiritusAccountCreation || {}, jQuery);