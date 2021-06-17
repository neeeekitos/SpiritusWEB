(function(namespace, $, undefined) {

    function changePageTitle (title) {
        document.title = title
    }

    function createMediumRow(id, label, value) {
        const element = $("<div></div>");
        element.addClass("row");

        const header = $("<h4></h4>");
        header.text(label);

        const paragraph = $("<p></p>");
        paragraph.attr("id", id);
        paragraph.text(value);

        element.append(header);
        element.append(paragraph);

        $("#medium-informations").append(element);
    }

    function showMediumModal() {
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
            var id;
            var element;
            var label;
            console.log(data);
            $("#medium-informations").html("");
            const medium = data.medium;
            const denomination = medium.denomination;
            const gender = medium.gender === "MALE" ? "Homme" : "Femme";
            const presentation = medium.presentation;
            const mediumType = medium.mediumType;

            id = "mediumType";
            label = "Type";
            createMediumRow(id, label, mediumType);

            id = "denomination";
            label = "Dénomination";
            createMediumRow(id, label, denomination);

            id = "gender";
            label = "Gendre";
            createMediumRow(id, label, gender);

            id = "presentation";
            label = "Présentation";
            createMediumRow(id, label, presentation);

            switch (mediumType) {
                case "Spirite" :
                    id = "support";
                    label = "Support";
                    const support = medium.support;
                    createMediumRow(id, label, support);
                    break;
                case "Astrologue":
                    const formation = medium.formation;
                    const promotion = medium.promotion;

                    id = "formation";
                    label = "Formation";
                    createMediumRow(id, label, formation);

                    id = "promotion";
                    label = "Promotion";
                    createMediumRow(id, label, promotion);

                    break;
                default:
                    break;
            }
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