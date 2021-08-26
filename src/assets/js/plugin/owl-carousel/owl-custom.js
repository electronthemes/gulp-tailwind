(function($) {
    // USE STRICT
    "use strict";

    $(window).load(function() {
        var owlSelector = $(".owl-custom-carousel");
        owlSelector.each(function() {
            var option = {
                items: 1,
                margin: 30,
                loop: false,
                slideBy: 1,
                center: false,
                mousedrag: true,
                touchdrag: false,
                pulldrag: true,
                nav: true,
                dots: true,
                dotsdata: false,
                autoplay: false,
                smartspeed: 650,
                animateout: 'fadeOut',
                animatein: null,
                autoHeight: true,
                autoWidth: true,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
            };
            for (var k in option) {
                if (option.hasOwnProperty(k)) {
                    if ($(this).attr("data-carousel-" + k) != null) {
                        option[k] = $(this).data("carousel-" + k);
                    }
                }
            }

            $(this).owlCarousel({
                items: option.items,
                slideBy: option.slideBy,
                margin: option.margin,
                loop: option.loop,
                center: option.center,
                mouseDrag: option.mousedrag,
                touchDrag: option.touchdrag,
                pullDrag: option.pulldrag,
                nav: option.nav,
                navText: option.navtext,
                dots: option.dots,
                dotsData: option.dotsdata,
                autoplay: option.autoplay,
                smartSpeed: option.smartspeed,
                animateIn: option.animatein,
                animateOut: option.animateout,
                autoHeight: option.autoHeight,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: option.xs,
                    },
                    // breakpoint from 768 up
                    575: {
                        items: option.sm,
                    },
                    // breakpoint from 768 up
                    768: {
                        items: option.md,
                    },
                    992: {
                        items: option.lg,
                    },
                    1300: {
                        items: option.xl,
                    },
                    1400: {
                        items: option.items,
                    },
                },
                // Go to the next item
            });
            // Go to the next item
            $(".next").click(function() {
                owlSelector.trigger("next.owl.carousel");
            });
            // Go to the previous item
            $(".prev").click(function() {
                owlSelector.trigger("prev.owl.carousel", [300]);
            });
            // if ($('.featured-slider').length) {
            //     $(".featured-slider").owlCarousel({
            //         onInitialized: counter,
            //         onTranslated: counter,
            //         items: 1,
            //         animateout: 'fadeOut',
            //     });
            // }
        });
    });

})(jQuery);