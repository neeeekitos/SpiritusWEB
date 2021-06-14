(function(namespace, $,  undefined) {

    namespace.updateAccountState = () => {
        if (localStorage.getItem('status') != null) {
            $("#account-management").append("<li id=\"signout-button\" class=\"nav-item btn active\">\n" +
                "                    <a id='disconnect-link' class=\"nav-link\" href=\"#\" onclick=\"SpiritusAccount.disconnect();return false;\">Sign out</a>\n" +
                "                </li>\n");
            $('#signup-button').remove();
            $('#signin-button').remove();

        } else{
            $("#account-management").append("<li id=\"signup-button\" class=\"nav-item btn active\">\n" +
                "                    <a class=\"nav-link\" href=\"createAccount.html\">Sign up</a>\n" +
                "                </li>\n" +
                "                <li id=\"signin-button\" class=\"nav-item btn btn-success active\">\n" +
                "                    <a class=\"nav-link\" href=\"login.html\">Sign in</a>\n" +
                "                </li>");
            $('#signout-button').remove();
        }
    };

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
                console.log(xhr.status);
                if (xhr.status === 200) {
                    alert("Vous êtes déconnecté"); // Message pour le paragraphe de notification
                    localStorage.removeItem('status');
                    namespace.updateAccountState();
                } else {
                    alert("Erreur de déconnexion"); // Message pour le paragraphe de notification
                }
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
            success: function(data, textStatus, xhr) {
                console.log(arguments);
                console.log(xhr.status);
                if (xhr.status === 200) {
                    console.log('Response',data); // LOG dans Console Javascript
                    $('#notification').html("Connexion avec succès"); // Message pour le paragraphe de notification
                    localStorage.setItem('status','loggedIn');
                    namespace.updateAccountState();
                    window.location = './profile.html';
                }
            },
            complete: function(xhr, textStatus) {
                console.log(xhr.status);
                if (xhr.status === 403) {
                    $('#notification').html("Vous êtes déjà connécté");
                }

                if (xhr.status === 401)
                    $('#notification').html("Mauvais login ou mot de passe");
            }
        });
    }

}) (window.SpiritusAccount = window.SpiritusAccount || {}, jQuery)
