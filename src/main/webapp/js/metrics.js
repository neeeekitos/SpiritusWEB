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
           var chartResultEmp=[];

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
                
                chartResultEmp.push({"name":cons.nom,"y":Number(cons.nombreConsult)}); 
            })  
            DrawChartEmp(chartResultEmp);
        }
        
        line = $("<tr></tr>");
        compteur =1;
        if (topMediums ==  null){
            data_tab = $("<td colspan='2'><center>Aucun top mediums de disponible pour le moment</center></td>");
            line.append(data_tab);
            $("#topMediums tbody").append(line);
        }else{
           var chartResultMediums=[];
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
                chartResultMediums.push({"name":cons.medium,"y":Number(cons.nombre)}); 
            })
            DrawChart(chartResultMediums);
            
        }
        
        
     })
     .fail( function (error) { // Appel KO => erreur technique Ã  gÃ©rer
         console.log('Erreur:', error); // LOG sur la Console Javascript
         alert('Erreur lors du chargement des donnÃ©es: HTTP Code ' + error.status); // Popup d'erreur
     });
        
    });

}) (window.MetricsPage = window.MetricsPage || {}, jQuery);

function DrawChart(result){
 $('#container').highcharts({
     chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Répartition des meilleurs médiums'
            },
            tooltip: {
                pointFormat: '{series.name}: <b> {point.percentage:.0f} </b>'
            },
            accessibility: {
                point: {
                    valueSuffix: ''
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.0f} '
                    }
                }
            },
            series: [{
                name: 'Medium',
                colorByPoint: true,
                data: result
            }]
        });
    }
        
     function DrawChartEmp(result){
    $('#containerEmp').highcharts({
        chart: {
                   plotBackgroundColor: null,
                   plotBorderWidth: null,
                   plotShadow: false,
                   type: 'pie'
               },
               title: {
                   text: 'Répartition des meilleurs médiums'
               },
               tooltip: {
                   pointFormat: '{series.name}: <b> {point.percentage:.0f} </b>'
               },
               accessibility: {
                   point: {
                       valueSuffix: ''
                   }
               },
               plotOptions: {
                   pie: {
                       allowPointSelect: true,
                       cursor: 'pointer',
                       dataLabels: {
                           enabled: true,
                           format: '<b>{point.name}</b>: {point.percentage:.0f} '
                       }
                   }
               },
               series: [{
                   name: 'Employé',
                   colorByPoint: true,
                   data: result
               }]
           });
}