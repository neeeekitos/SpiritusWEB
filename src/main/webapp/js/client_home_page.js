(function(namespace, $, undefined) {

    function changePageTitle (title) {
        document.title = title
    }

    $(document).ready(function() {
        changePageTitle("Welcome - client name");
        const connected = localStorage.getItem("status");
        if (connected == "loggedIn") {
            $('body').append("logged in");
        } else {
            $('body').append("NOT LOGGED IN");
        }

        $.ajax({
            url: "ActionServlet",
            type: "GET",
            data: {
                todo : "getClientHomePageInfos"
            },
            dataType: "json"
        }).done(function(data) {
            console.log("done");
            console.log(data);
        })

    });

})(window.clientHomePage = window.clientHomePage || {}, jQuery);