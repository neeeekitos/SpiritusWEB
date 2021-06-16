<<<<<<< HEAD
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
         console.log('response', response);
     })
     .fail( function (error) { // Appel KO => erreur technique à gérer
         console.log('Erreur:', error); // LOG sur la Console Javascript
         alert('Erreur lors du chargement des données: HTTP Code ' + error.status); // Popup d'erreur
     });
        
    });

}) (window.SpiritusAccountCreation = window.SpiritusAccountCreation || {}, jQuery);
=======
(function(namespace, $, undefined) {

    namespace.hello = function () {
        alert("hello world");
    }

    $(document).ready( function () {
        $.ajax({
         url: 'ActionServlet',
         method: 'GET',
         data:{
             todo:'getEmployeeHomePageInfosAction'
         },
         dataType:'json'
     })
      .done(function(data){
        console.log('response', data);
        const available = data.Employee.available;
        if (available){
            $(".available").text("Disponibilité : disponible");
        }else{
            $(".available").text("Disponibilité : indisponible");

        }
        
     })
     .fail( function (error) { // Appel KO => erreur technique à gérer
         console.log('Erreur:', error); // LOG sur la Console Javascript
         alert('Erreur lors du chargement des données: HTTP Code ' + error.status); // Popup d'erreur
     });
        
    });

}) (window.EmployeeHomePage = window.EmployeeHomePage || {}, jQuery);
>>>>>>> a7e4c19 (Employee Home - Html CSS)
