(function(namespace, $, undefined) {

    namespace.hello = function () {
        alert("hello world");
    }

    $(document).ready( function () {


        $('#createbtn').click(function() {
            console.log("clicked");
            const params = {};
            params.firstname = $("#firstname").val();
            params.lastname = $("#lastname").val();
            params.birthdate = $("#birthdate").val();
            params.phone = $("#phone").val();
            params.address = $("#address").val();
            params.email = $("#email").val();
            params.password = $("#password").val();

            console.log(params);

            $.ajax({
                url: "ActionServlet",
                type: "POST",
                data: {
                    todo : "createAccount",
                    lastname: params.lastname,
                    firstname : params.firstname,
                    birthdate : params.birthdate,
                    phone: params.phone,
                    mail: params.email,
                    password: params.password,
                    address: params.address,
                },
                dataType: "json"
            }).done(function(data) {
                console.log(data);
                alertBox = $("#alertMessage");
                alertBox.removeClass();
                if (data.success) {
                    alertBox.addClass("alert alert-success");
                    alertBox.text("Your account has been created");
                } else {
                    alertBox.addClass("alert alert-danger");
                    alertBox.text("Account creation failed");
                    if (data.reason) {
                        alertBox.append("<br>").append("\nReason : " + data.reason);
                    }
                }
            });

        });

    });

}) (window.SpiritusAccountCreation = window.SpiritusAccountCreation || {}, jQuery);