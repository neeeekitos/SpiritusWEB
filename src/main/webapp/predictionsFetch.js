(function(namespace, $,  undefined) {

    namespace.fetchPredictions = () => { // Fonction appelée lors du clic sur le bouton

        console.log("fetching mediums..."); // LOG dans Console Javascript
        $('#notification').html("Connexion..."); // Message pour le paragraphe de notification

        // Récupération de la valeur des champs du formulaire
        var champLogin = $('#champ-login').val();
        var champPassword = $('#champ-password').val();

        // Appel AJAX
        $.ajax({
            url: './ActionServlet',
            method: 'GET',
            data: {
                todo: 'getPrediction',
                love: 1,
                health: 2,
                job: 3,
                clientId: localStorage.getItem("currentConsultationClientId")
            },
            dataType: 'json',
            success: function(data, textStatus, xhr) {
                console.log(arguments);
                console.log(xhr.status);
                if (xhr.status === 200) {
                    console.log('Response',data.predictions.health); // LOG dans Console Javascript
                    console.log('Response',data.predictions.job); // LOG dans Console Javascript
                    console.log('Response',data.predictions.love); // LOG dans Console Javascript
                    $("#love-prediction").text(data.predictions.love);
                    $("#health-prediction").text(data.predictions.health);
                    $("#job-prediction").text(data.predictions.job);
                }
            }
        });
    }

    $(document).ready(function(){
        $("#up1").on('click',function(){
            if ($("#incdec1 input").val() < 4)
                $("#incdec1 input").val(parseInt($("#incdec1 input").val())+1);
        });
        $("#up2").on('click',function(){
            if ($("#incdec2 input").val() < 4)
                $("#incdec2 input").val(parseInt($("#incdec2 input").val())+1);
        });
        $("#up3").on('click',function(){
            if ($("#incdec3 input").val() < 4)
                $("#incdec3 input").val(parseInt($("#incdec3 input").val())+1);
        });

        $("#down1").on('click',function(){
            console.log("hui");
            if ($("#incdec1 input").val() > 1)
                $("#incdec1 input").val(parseInt($("#incdec1 input").val())-1);
        });
        $("#down2").on('click',function(){
            if ($("#incdec2 input").val() > 1)
                $("#incdec2 input").val(parseInt($("#incdec2 input").val())-1);
        });
        $("#down3").on('click',function(){
            if ($("#incdec3 input").val() > 1)
                $("#incdec3 input").val(parseInt($("#incdec3 input").val())-1);
        });


        $.ajax({
            url: 'ActionServlet',
            method: 'GET',
            data:{
                todo:'getEmployeeHomePageInfos'
            },
            dataType:'json'
        }).done(function(data) {
            console.log("the request data");
            console.log(data);
            const inProgressConsultation = data.inProgressConsultation;
            $("#zodiacSign").text(inProgressConsultation.clientZodiac);
            $("#chineeseAstralSign").text(inProgressConsultation.clientChineeseAstral);
            $("#luckyColor").text(inProgressConsultation.clientColor);
            $("#totemAnimal").text(inProgressConsultation.clientTotem);
            const imageUrl = "images/zodiac/" + inProgressConsultation.clientZodiac + ".png"
            $("#zodiacImage").attr("src", imageUrl);
            localStorage.setItem("currentConsultationClientId", inProgressConsultation.clientId);
        })

    });

}) (window.SpiritusPredictions = window.SpiritusPredictions || {}, jQuery)
