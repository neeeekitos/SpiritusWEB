(function(namespace, $,  undefined) {

    namespace.fetchMediums = (parentId, nbMediums) => { // Fonction appelée lors du clic sur le bouton

        console.log("fetching mediums..."); // LOG dans Console Javascript
        $('#notification').html("Connexion..."); // Message pour le paragraphe de notification

        // Récupération de la valeur des champs du formulaire
        var champLogin = $('#champ-login').val();
        var champPassword = $('#champ-password').val();

        // Appel AJAX
        $.ajax({
            url: './ActionServlet',
            method: 'POST',
            data: {
                todo: 'getTopFiveMedium'
            },
            dataType: 'json',
            success: function(data, textStatus, xhr) {
                console.log(arguments);
                console.log(xhr.status);
                if (xhr.status === 200) {
                    console.log('Response',data); // LOG dans Console Javascript

                    var imgList;
                    for (i = 0; i < nbMediums; i++) {
                        var randImageIndex = getRandomInt(0, 4);
                        imgList = '<div class="swiper-slide" style="background-image:url("images/im' + randImageIndex + '.jpeg")">\n' +
                            '    <img src="images/im' + randImageIndex + '.jpeg" class="entity-img" />\n' +
                            '    <div class="content">\n' +
                            '        <p class="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">Alexis Berry</p>\n' +
                            '        <span class="caption" data-swiper-parallax="-20%">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>\n' +
                            '    </div>\n' +
                            '</div>';
                    }
                    console.log(randImageIndex);
                    $(parentId).append(imgList);
                }
            }
        });
    }

    namespace.getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }



}) (window.SpiritusSlides = window.SpiritusSlides || {}, jQuery)
