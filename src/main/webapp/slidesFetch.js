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
            method: 'GET',
            data: {
                todo: 'getTopMediums',
                nbMediums: nbMediums
            },
            dataType: 'json',
            success: function(data, textStatus, xhr) {
                console.log(arguments);
                console.log(xhr.status);
                if (xhr.status === 200) {
                    console.log('Response',Object.values(data)); // LOG dans Console Javascript
                    var imgList = "";
                    nbMediums = Object.keys(data).length;
                    console.log(nbMediums);
                    for (i = 0; i < nbMediums; i++) {
                        imgList += '<div class="swiper-slide" style="background-image:url(images/im' + (i+1) + '.jpeg)">\n' +
                            '    <img src="images/im' + (i+1) + '.jpeg" class="entity-img" />\n' +
                            '    <div class="content">\n' +
                            '        <p class="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">' + Object.values(data)[i].denomination + '</p>\n' +
                            '        <span class="caption" data-swiper-parallax="-20%">' + Object.values(data)[i].description + '<br><br>Nombre de consultations : ' + Object.values(data)[i].nbConsultations + '</span>\n' +
                            '    </div>\n' +
                            '</div>';
                    }
                    $('#dyn-swiper').append(imgList);

                    // Params
                    sliderSelector = '.swiper-container',
                        options = {
                            init: false,
                            loop: true,
                            speed:800,
                            slidesPerView: 4, // or 'auto'
                            // spaceBetween: 10,
                            centeredSlides : true,
                            effect: 'coverflow', // 'cube', 'fade', 'coverflow',
                            coverflowEffect: {
                                rotate: 50, // Slide rotate in degrees
                                stretch: 0, // Stretch space between slides (in px)
                                depth: 100, // Depth offset in px (slides translate in Z axis)
                                modifier: 1, // Effect multipler
                                slideShadows : true, // Enables slides shadows
                            },
                            grabCursor: true,
                            parallax: true,
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                            },
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            breakpoints: {
                                1180: {
                                    slidesPerView: 2
                                },
                                1023: {
                                    slidesPerView: 1,
                                    spaceBetween: 0
                                }
                            },
                            // Events
                            on: {
                                imagesReady: function(){
                                    this.el.classList.remove('loading');
                                }
                            }
                        };
                    mySwiper = new Swiper(sliderSelector, options);
                    mySwiper.init();

                }
            }
        });
    }



}) (window.SpiritusSlides = window.SpiritusSlides || {}, jQuery)
