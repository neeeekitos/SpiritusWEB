(function(namespace, $, undefined) {

    const connected = localStorage.getItem("status");
    if (connected !== "loggedIn") {
        window.location = "login.html";
    }

    function changePageTitle (title) {
        document.title = title
    }

    function createMediumRow(id, label, value, destination) {
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

    function createMediumTable(medium) {
        const table = $("<table></table>");
        table.addClass("table");
        const elements = [];
        const data = [];
        const type = medium.mediumType;
        elements.push("Type");
        data.push(type);
        elements.push("Dénomination");
        data.push(medium.denomination);
        elements.push("Présentation");
        data.push(medium.presentation);
        elements.push("Genre");
        data.push(medium.gender === "MALE" ? "Homme" : "Femme");
        switch (type) {
            case "Astrologue":
                elements.push("Formation");
                data.push(medium.formation);
                elements.push("Promotion");
                data.push(medium.promotion);
                break;
            case "Spirite":
                elements.push("Support");
                data.push("support");
                break;
            default:
                break;
        }

        const thead = $("<thead></thead>");
        var tr = $("<tr></tr>");
        elements.forEach(element => {
            const tableHeader = $("<th></th>");
            tableHeader.text(element);
            tr.append(tableHeader);
        });
        thead.append(tr);

        const tbody = $("<tbody></tbody>");
        tr = $("<tr></tr>");
        data.forEach( datium => {
            const tableData = $("<td></td>");
            tableData.text(datium);
            tr.append(tableData);
        })
        tbody.append(tr);

        table.append(thead);
        table.append(tbody);

        return table;

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
            label = "genre";
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
        $("#mediumProfileConsultationRequest").html("");
        $.ajax({
            url: "ActionServlet",
            type: "GET",
            data: {
                todo : "getAllMediums"
            },
            dataType: "json"
        }).done (function(data) {
            $("#mediums-list").html("");
            console.log(data);
            const mediumsList = data.mediumsList;
            const option = $("<option selected>Sélectionner un médium</option>");
            option.val("");
            $("#mediums-list").append(option);
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

    function submitConsultation() {
        const mediumId = $("#mediums-list").val();
        console.log(mediumId);
        if (mediumId === "") {
            alert ("Veuillez choisir un medium");
            return;
        }
        $.ajax({
            url: "ActionServlet",
            type: "GET",
            data: {
                todo : "requestConsultation",
                mediumId : mediumId
            },
            dataType: "json"
        }).done(function(data) {
            console.log("consultation creation success");
            const consultation = data.consultation;
            const advisor = consultation.advisor;
            const denomination = consultation.medium.denomination;
            const dateString = consultation.date;
            const status = consultation.status;

            const tableRow = $("<tr></tr>");
            var td = $("<td></td>");
            td.text(advisor);
            td.addClass("mediumAdvisor");
            td.attr("id", consultation.medium.id);
            td.attr("data-mdb-target", "#mediumProfileModal");
            td.attr("data-mdb-toggle", "modal");
            td.click(showMediumModal);
            tableRow.append(td);

            td = $("<td></td>");
            td.text(denomination);
            tableRow.append(td);

            td = $("<td></td>");
            td.text(dateString);
            tableRow.append(td);

            td = $("<td></td>");
            td.text(status);
            tableRow.append(td);

            $("#historyTable tbody").prepend(tableRow);
            $("#consultationRequestModal").modal('hide');
        }).fail(function (xhr, text, error) {
            const status = xhr.status;
            switch (status) {
                case 403 :
                    alert ("Vous n'êtes pas connectés");
                    break;
                case 409 :
                    alert("Conflit : vous avez déjà une consultation en cours");
                    break;
                case 400:
                    alert("Mauvaise requête");
                    break;
            }
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
            const mediumId = $(this).val();
            console.log(mediumId);
            $.ajax({
                url: "ActionServlet",
                type: "GET",
                data: {
                    todo : "getMediumProfile",
                    mediumId : mediumId
                },
                dataType: "json"
            }).done(function(data) {
                console.log(data);
                const medium = data.medium;
                const destinationElement = $("#mediumProfileConsultationRequest");
                const table = createMediumTable(medium);
                console.log(table);
                destinationElement.html("");
                destinationElement.append(table);
            });
        });

        $("#btn-createConsultation").click(submitConsultation);

    });

})(window.clientHomePage = window.clientHomePage || {}, jQuery);
