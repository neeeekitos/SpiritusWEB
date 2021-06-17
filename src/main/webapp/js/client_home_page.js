(function(namespace, $, undefined) {

    const connected = localStorage.getItem("status");
    if (connected !== "loggedIn") {
        window.location = "login.html";
    }

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

    function requestConsultationForm() {
        $.ajax({
            url: "ActionServlet",
            type: "GET",
            data: {
                todo : "getAllMediumsSerialization"
            },
            dataType: "json"
        }).done (function(data) {
            $("#mediums-list").html("");
            console.log(data);
            const mediumsList = data.mediumsList;
            $("#mediums-list").append($("<option selected>Sélectionner un médium</option>"));
            mediumsList.forEach( medium => {
                const denomination = medium.denomination;
                const id = medium.id;
                const option = $("<option></option>");
                option.text(denomination);
                option.attr("value", id);
                $("#mediums-list").append(option);
            })

        })
    }

    $(document).ready(function() {
        changePageTitle("Welcome - client name");

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
            $(".zodiacSign").text("Signe zodiac : " + zodiacSign);
            $(".chineeseAstralSign").text("Signe astrologique chinois : " + chineeseAstral);
            $(".totemAnimal").text("Animal totem : " + totemAnimal);
            $(".luckyColor").text("Couleur porte bonheur : " + luckyColor);
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

            $("#btn-newConsultation").click(requestConsultationForm);
        });

        $("#mediums-list").change(function() {
            console.log("medium changed");
        })

    });

})(window.clientHomePage = window.clientHomePage || {}, jQuery);