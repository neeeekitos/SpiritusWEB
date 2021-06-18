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
             todo:'getEmployeeHomePageInfos'
         },
         dataType:'json'
     })
      .done(function(data){
        console.log('response', data);
        const available = data.Employee.available;
        const pendingConsult = data.pendingOrInProgressConsultation;
        const isPending = data.pendingOrInProgressConsultation.isPending;

        var data_tab;
        var line = $("<tr></tr>");
        if (available){
            $(".available").text("Vous êtes prêt à recevoir une consultation !");
            $("#available").attr("src", "./images/available.png");
            data_tab = $("<td colspan='4'>Aucune consultation en cours</td>");
        }else{
            $(".available").text("Vous avez une demande à traiter. ");
            $("#available").attr("src", "./images/unavailable.png");
            if (isPending) {
                $('#consultationStatus').text("Consultation en attente");
                $('#startConsultationButton').prop('disabled', false);
            } else {
                $('#consultationStatus').text("Consultation en cours");
                window.location = './consultationPageEmployee.html';
            }
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

            localStorage.setItem("clientOfCurrentConsultationId", cons.client_ID);

        }
        line.append(data_tab);
        $("#pendingInProgressConsult tbody").append(line);

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
