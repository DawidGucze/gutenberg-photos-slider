window.addEventListener('load', function () {

    const $ = jQuery;
    const photos = $('.photos_slider_block_photos');

    document.addEventListener("scroll", function () {

        if (!window.photosBlockSliderInitialized) {

            photos.slick({
                centerMode: true,
                centerPadding: '200px',
                slidesToShow: 3,
                autoplay: true,
                arrows: false,
                swipe: false,
                pauseOnHover: false,
                responsive: [
                    {
                        breakpoint: 400,
                        settings: {
                            slidesToShow: 1,
                            centerPadding: '30px'
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            centerPadding: '60px'
                        }
                    },
                    {
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 1,
                            centerPadding: '150px'
                        }
                    },
                    {
                        breakpoint: 1460,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });

            window.photosBlockSliderInitialized = true;
        }
    });

});