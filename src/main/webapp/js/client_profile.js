(function (namespace, $, undefined) {

    const connected = localStorage.getItem("status");
    if (connected !== "loggedIn") {
        window.location = "login.html";
    }

    namespace.updateClientInfos = () => {
        $.ajax({
            url: "ActionServlet",
            type: "POST",
            data: {
                todo: "updateClientInfos",
                firstname: $("#lastname").val(),
                lastname: $("#firstname").val(),
                phone: $("#phone").val(),
                mail: $("#email").val(),
                address: $("#address").val(),
                birthdate: $("#birthdate").val()
            },
            dataType: "json",
            complete: function (xhr, textStatus) {
                console.log(xhr.status);
                if (xhr.status === 200) {
                    alert("Votre profil a été modifié."); // Message pour le paragraphe de notification
                } else {
                    alert("Erreur lors de la modification de votre profil."); // Message pour le paragraphe de notification
                }
            }
        });



    }


    $(document).ready(function () {

        $.ajax({
            url: "ActionServlet",
            type: "GET",
            data: {
                todo: "getClientInfos"
            },
            dataType: "json"
        }).done(function (data) {
            console.log("done");
            console.log(data);

            $("#lastname").attr("value", data.lastName);
            $("#firstname").attr("value", data.firstName);
            $("#phone").attr("value", data.phone);
            $("#email").attr("value", data.mail);
            $("#address").attr("value", data.address);
            $("#birthdate").attr("value", data.birthDate);

        }).fail(function (error) { // Appel KO => erreur technique à gérer
            console.log('Erreur:', error); // LOG sur la Console Javascript
            alert('Erreur lors du chargement des données: HTTP Code ' + error.status); // Popup d'erreur
        });
    });

})(window.clientProfile = window.clientProfile || {}, jQuery);
