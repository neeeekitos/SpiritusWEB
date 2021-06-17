(function(namespace, $, undefined) {

    function changePageTitle (title) {
        document.title = title
    }

    function showMediumModal() {
        $("#modal").css("display", "block");
        console.log($(this).attr("id"));
        $.ajax({
            url: "ActionServlet",
            type: "GET",
            data: {
                todo : "getMediumProfile",
                mediumId : $(this).attr("id")
            },
            dataType: "json"
        }).done(function(data) {
            console.log(data);
        })
    }

    $(document).ready(function() {
        changePageTitle("Welcome - client name");
        const connected = localStorage.getItem("status");
        if (connected == "loggedIn") {
            $('#content').append("logged in");
        } else {
            $('#content').append("NOT LOGGED IN");
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
            const zodiacSign = data.zodiacSign;
            const chineeseAstral = data.chineeseAstralSign;
            const totemAnimal = data.totemAnimal;
            const luckyColor = data.luckyColor;
            const consultations = data.consultationsHistory;
            const imageUrl = "./images/zodiac/" + zodiacSign + ".png";
            $("#zodiacImage").attr("src", imageUrl);
            $(".zodiacSign").text("Zodiac sign : " + zodiacSign);
            $(".chineeseAstralSign").text("Chineese astral sign : " + chineeseAstral);
            $(".totemAnimal").text("Totem animal : " + totemAnimal);
            $(".luckyColor").text("Lucky color : " + luckyColor);
            consultations.forEach(cons => {
                const line = $("<tr></tr>");
                var data = $("<td></td>");
                data.text(cons.advisor);
                data.addClass("mediumAdvisor");
                data.attr("id", cons.mediumId);
                data.attr("data-mdb-target", "#mediumProfileModal");
                data.attr("data-mdb-toggle", "modal");
                data.click(showMediumModal);
                line.append(data);

                data = $("<td></td>");
                data.text(cons.denomination);
                line.append(data);

                data = $("<td></td>");
                data.text(cons.date);
                line.append(data);

                data = $("<td></td>");
                data.text(cons.status);
                line.append(data);

                $("#historyTable tbody").append(line);
            })
        })

    });

})(window.clientHomePage = window.clientHomePage || {}, jQuery);