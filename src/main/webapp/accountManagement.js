(function(namespace, $,  undefined) {

    $(document).ready(() => {
        if (sessionStorage.getItem('status') != null) {
            $("#buttons").append("<button id=\"bouton-deconnexion\" class=\"btn btn-default\" onclick='SpiritusAccount.disconnect()'>Déconnexion</button>\n");
        } else{
            $("#buttons").append("<button id=\"bouton-connexion\" class=\"btn btn-default\" onclick='SpiritusAccount.connect()'>Connexion</button>\n");
        }
    });

    namespace.disconnect = () => { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de deconnexion");
        $('#notification').html("Déconnexion...");

        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'disconnect'
            },
            dataType: 'json',
            complete: function(xhr, textStatus) {
                $('#notification').html("Vous êtes déconnecté"); // Message pour le paragraphe de notification
                $("#buttons").append("<button id=\"bouton-connexion\" onclick='SpiritusAccount.connect()'>Connexion</button>\n");
                $('#bouton-deconnexion').remove();
                sessionStorage.removeItem('status');
            }
        })
    };

    namespace.connect = () => { // Fonction appelée lors du clic sur le bouton

        console.log("clic sur le bouton de connexion"); // LOG dans Console Javascript
        $('#notification').html("Connexion..."); // Message pour le paragraphe de notification

        // Récupération de la valeur des champs du formulaire
        var champLogin = $('#champ-login').val();
        var champPassword = $('#champ-password').val();

        // Appel AJAX
        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'authenticate',
                login: champLogin,
                password: champPassword
            },
            dataType: 'json',
        })
        .done( function (response) {
            console.log('Response',response); // LOG dans Console Javascript
            $('#notification').html("Connexion avec succès"); // Message pour le paragraphe de notification
            $("#buttons").append("<button id=\"bouton-deconnexion\" onclick='SpiritusAccount.disconnect()'>Déconnexion</button>\n");
            $('#bouton-connexion').remove();
            sessionStorage.setItem('status','loggedIn');
        })
        .fail( function (error) {
            if (error.status === 403) {
                $('#notification').html("Vous êtes déjà connécté");
            }

            if (error.status === 401)
                $('#notification').html("Mauvais login ou mot de passe");
        })
        .always( function () { // Fonction toujours appelée
        });
    }

}) (window.SpiritusAccount = window.SpiritusAccount || {}, jQuery)
