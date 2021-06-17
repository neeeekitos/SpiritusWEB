(function(namespace, $,  undefined) {

    namespace.finishConsultation = () => { // Fonction appelée lors du clic sur le bouton

        console.log("finishing consultation..."); // LOG dans Console Javascript

        const connected = localStorage.getItem("status");

        //redirect to login if not connected
        if (connected !== "loggedIn") {
            window.location = './login.html';
            return;
        }

        // Appel AJAX
        $.ajax({
            url: './ActionServlet',
            method: 'GET',
            data: {
                todo: 'finishConsultation',
                comment: $('#comment-area').val()
            },
            dataType: 'json',
            complete: function (xhr, textStatus) {
                console.log(xhr.status);
                if (xhr.status === 200) {
                    //redirect
                    window.location = './DashEmployee.html';
                }
            }
        });
    };

}) (window.SpiritiusConsultation = window.SpiritiusConsultation || {}, jQuery)
