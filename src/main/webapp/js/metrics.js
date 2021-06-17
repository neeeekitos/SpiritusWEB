(function(namespace, $, undefined) {

   
    $(document).ready( function () {
        $.ajax({
         url: 'ActionServlet',
         method: 'GET',
         data:{
             todo:'GetEmployeeMetrics'
         },
         dataType:'json'
     })
      .done(function(data){
        console.log('response', data);

        const topEmployee = data.topEmployee;
        const topMediums = data.topMediums;
        
        var data_tab;
        var line = $("<tr></tr>");
        var compteur =1 ;
        
        if (topEmployee ==  null){
            data_tab = $("<td colspan='2'><center>Aucun top employé de disponible pour le moment</center></td>");
            line.append(data_tab);
            $("#topEmployee tbody").append(line);
        }else{
           topEmployee.forEach(cons => {
                line = $("<tr></tr>");
                data_tab = $("<th scope='row'></th>");
                data_tab.text(compteur);
                line.append(data_tab);
                
                data_tab = $("<td class='text-center'></td>");
                data_tab.text(cons.nom);
                line.append(data_tab);
                
                data_tab = $("<td class='text-center'></td>");
                data_tab.text(cons.nombreConsult);
                line.append(data_tab);
                
                compteur = compteur+1;
                $("#topEmployee tbody").append(line);
            })  
        }
        
        line = $("<tr></tr>");
        compteur =1;
        if (topMediums ==  null){
            data_tab = $("<td colspan='2'><center>Aucun top mediums de disponible pour le moment</center></td>");
            line.append(data_tab);
            $("#topMediums tbody").append(line);
        }else{
           topMediums.forEach(cons => {
                line = $("<tr></tr>");
                data_tab = $("<th scope='row'></th>");
                data_tab.text(compteur);
                line.append(data_tab);
                
                data_tab = $("<td class='text-center'></td>");
                data_tab.text(cons.medium);
                line.append(data_tab);
                
                data_tab = $("<td class='text-center'></td>");
                data_tab.text(cons.nombre);
                line.append(data_tab);
                
                compteur = compteur+1;
                $("#topMediums tbody").append(line);
            })  
        }

     })
     .fail( function (error) { // Appel KO => erreur technique Ã  gÃ©rer
         console.log('Erreur:', error); // LOG sur la Console Javascript
         alert('Erreur lors du chargement des donnÃ©es: HTTP Code ' + error.status); // Popup d'erreur
     });
        
    });

}) (window.MetricsPage = window.MetricsPage || {}, jQuery);

