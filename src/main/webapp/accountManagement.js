(function (namespace, $, undefined) {

    namespace.updateAccountState = () => {
        console.log("PATH NAME : " + window.location.pathname);
        if (localStorage.getItem('status') != null) {
            const homePage = localStorage.getItem("userType") === "client" ? "client.html" : "DashEmployee.html";
            $('#signup-button').remove();
            $('#signin-button').remove();


            if (window.location.pathname == "/SpiritusWEB/index.html") {
                $('#medium-button').remove();
                $("#home-buttons").append(
                    "   <a id='medium-button' class='btn btn-secondary btn-margin-left' href='mediums.html'\n" +
                    "                   role='button'>Mediums</a>"
                );
                if(localStorage.getItem("userType") != "client") {
                    $("#home-buttons").append(
                    "   <a id='stats' class='btn btn-secondary btn-margin-left' href='metrics.html' role='button'>Statistiques</a>"
                    );
                    $("#home-buttons").append(
                        "   <a id='dashboard' class='btn btn-secondary btn-margin-left' href='DashEmployee.html' role='button'>Dashboard</a>"
                    );
                }
            }
            else if (localStorage.getItem("userType") !== "client") {
                $('#medium-button').remove();
            }



            if(localStorage.getItem("userType") === "client") {
                $("#account-management").append(
                    "<a id='signout-button' class='btn btn-secondary btn-margin-left' role='button' \n" +
                    "href='clientProfile.html'>Profil</a>"
                );
            }
            $("#account-management").append(
                "<a id='signout-button' class='btn btn-secondary btn-margin-left' role='button' \n" +
                "onclick='SpiritusAccount.disconnect();return false;'>Se déconnecter</a>"
            );
            if(localStorage.getItem("userType") === "client"){
                $("#home-buttons").append(
                    "   <a id='clientHome' class='btn btn-secondary btn-margin-left' href='" + homePage + "' role='button'>Accueil Client</a>"
                );
            }

            if (window.location.pathname == "/SpiritusWEB/DashEmployee.html") {
                $("#home-buttons").append(
                    "   <a id='stats' class='btn btn-secondary btn-margin-left' href='metrics.html' role='button'>Statistiques</a>"
                );
            }
            if (window.location.pathname == "/SpiritusWEB/metrics.html") {
                $("#home-buttons").append(
                    "   <a id='dashboard' class='btn btn-secondary btn-margin-left' href='DashEmployee.html' role='button'>Dashboard</a>"
                );
            }


        } else {
            $('#signout-button').remove();

            if (window.location.pathname != "/SpiritusWEB/login.html") {
                $("#account-management").append(
                    "<a id='signin-button' class='btn btn-primary btn-margin-left' href='login.html' role='button'>Se connecter</a>"
                );
            } else if (window.location.pathname != "/SpiritusWEB/createAccount.html") {
                $("#account-management").append(
                    "<a id='signup-button' class='btn btn-secondary btn-margin-right' href='createAccount.html' role='button'>S'inscrire</a>"
                );
            }


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
                    window.location = "./index.html";
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
                    var user = data.user;
                    if (user === "client") {
                        window.location = './client.html';
                        localStorage.setItem("userType", "client");
                    } else if (user === "employee") {
                        window.location = './DashEmployee.html';
                        localStorage.setItem("userType", "employee");
                    }
                }
            },
            complete: function (xhr, textStatus) {
                console.log(xhr.status);
                if (xhr.status === 403) {
                    $('#notification').html("Vous êtes déjà connecté");
                }

                if (xhr.status === 401)
                    $('#notification').html("Mauvais login ou mot de passe");
            }
        });
    }

    $(document).ready(function() {
        namespace.updateAccountState();
    });

})(window.SpiritusAccount = window.SpiritusAccount || {}, jQuery)
