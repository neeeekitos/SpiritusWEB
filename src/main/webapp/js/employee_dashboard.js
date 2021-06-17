(function(namespace, $, undefined) {

    namespace.hello = function () {
        alert("hello world");
    }
    
    function showMediumModal() {
        alert("Medium info");
        $("#modal").css("display", "block");
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
        const pendingConsult = data.pendingConsultation;

        var data_tab;
        var line = $("<tr></tr>");
        if (available){
            $(".available").text("Vous êtes prêt à recevoir une consultation !");
            $("#available").attr("src", "./images/available.png");
            data_tab = $("<td colspan='4'><center>Aucune consultation en cours</center></td>");
        }else{
            $(".available").text("Vous avez une demande à traiter. ");
            $("#available").attr("src", "./images/unavailable.png");
            
            data_tab = $("<td></td>");
            data_tab.text(pendingConsult.date);
            line.append(data_tab);

            data_tab = $("<td></td>");
            data_tab.text(pendingConsult.medium_nom);
            line.append(data_tab);

            data_tab = $("<td></td>");
            data_tab.text(pendingConsult.client_nom);
            line.append(data_tab);
            
            data_tab = $("<td></td>");
            data_tab.text(pendingConsult.status);
            line.append(data_tab);
        }
        line.append(data_tab);
        $("#pendingConsult tbody").append(line);

        const historiqueConsult = data.Historique;
        if (historiqueConsult ==  null){
            data_tab = $("<td colspan='5'><center>Aucune consultation en historique</center></td>");
            line.append(data_tab);
            $("#historiqueConsult tbody").append(line);
        }else{
           historiqueConsult.forEach(cons => {
                line = $("<tr></tr>");
                
                data_tab = $("<td></td>");
                data_tab.text(cons.date);
                line.append(data_tab);
                
                data_tab = $("<td></td>");
                data_tab.text(cons.medium_nom);
                data_tab.attr("id", cons.medium_ID);
                data_tab.click(showMediumModal);
                line.append(data_tab);
                
                data_tab = $("<td></td>");
                data_tab.text(cons.client_nom);
                data_tab.attr("id", cons.client_ID);
                line.append(data_tab);

                data_tab = $("<td></td>");
                data_tab.text(cons.status);
                line.append(data_tab);

                data_tab = $("<td></td>");
                data_tab.text(cons.comment);
                line.append(data_tab);
                
                $("#historiqueConsult tbody").append(line);
            })  
        }
        
       
     
     })
     .fail( function (error) { // Appel KO => erreur technique à gérer
         console.log('Erreur:', error); // LOG sur la Console Javascript
         alert('Erreur lors du chargement des données: HTTP Code ' + error.status); // Popup d'erreur
     });
        
    });

}) (window.EmployeeHomePage = window.EmployeeHomePage || {}, jQuery);
