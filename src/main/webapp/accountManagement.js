(function (namespace, $, undefined) {

    namespace.updateAccountState = () => {
        if (localStorage.getItem('status') != null) {
            $('#signup-button').remove();
            $('#signin-button').remove();
            $("#account-management").append(
                "<a id='signout-button' class='btn btn-secondary btn-margin-left' role='button' \n" +
                "onclick='SpiritusAccount.disconnect();return false;'>Se déconnecter</a>"
            );

        } else {
            $('#signout-button').remove();

            $("#account-management").append(
                "<a id='signup-button' class='btn btn-secondary btn-margin-right' href='createAccount.html' role='button'>S'inscrire</a>\n" +
                "<a id='signin-button' class='btn btn-primary btn-margin-left' href='login.html' role='button'>Se connecter</a>"
            );
        }
    };

    namespace.disconnect = () => { // Fonction appelée lors du clic sur le bouton

        console.log("Clic sur le bouton de deconnexion");
        $('#notification').html("Déconnexion...");

        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'disconnect'
            },
            dataType: 'json',
            complete: function (xhr, textStatus) {
                console.log(xhr.status);
                if (xhr.status === 200) {
                    alert("Vous êtes déconnecté"); // Message pour le paragraphe de notification
                    localStorage.removeItem('status');
                    namespace.updateAccountState();
                } else {
                    alert("Erreur lors de la déconnexion."); // Message pour le paragraphe de notification
                }
            }
        })
    };

    namespace.connect = () => { // Fonction appelée lors du clic sur le bouton

        console.log("Clic sur le bouton de connexion"); // LOG dans Console Javascript
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
            success: function (data, textStatus, xhr) {
                console.log(arguments);
                console.log(xhr.status);
                if (xhr.status === 200) {
                    console.log('Response', data); // LOG dans Console Javascript
                    $('#notification').html("Connexion avec succès"); // Message pour le paragraphe de notification
                    localStorage.setItem('status', 'loggedIn');
                    namespace.updateAccountState();
                    window.location = './clientProfile.html';
                }
            },
            complete: function (xhr, textStatus) {
                console.log(xhr.status);
                if (xhr.status === 403) {
                    $('#notification').html("Vous êtes déjà connécté");
                }

                if (xhr.status === 401)
                    $('#notification').html("Mauvais login ou mot de passe");
            }
        });
    }

})(window.SpiritusAccount = window.SpiritusAccount || {}, jQuery)
