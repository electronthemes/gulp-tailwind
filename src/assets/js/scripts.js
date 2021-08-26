(function($) {
    var allfunction = {
        menu_bar: function() {
            $(".toggle-bar").on("click", function() {
                $(this).toggleClass('active');
                $('.navbar').toggleClass('navbar-activated');
                $('.header-area , .header-two').toggleClass('active');
                $('body').toggleClass('overlay');
            });
        },
        search_bar: function() {
            $(".search").on("click", function() {
                $('.search-area').addClass('active');
                $('body').addClass('overlay');
            });
            $(".search-close").on("click", function() {
                $('.search-area').removeClass('active');
                $('body').removeClass('overlay');
            });
        },
        feature_slider: function() {
            var owlSelector1 = $(".post-card-carousel");
            // Go to the next item
            $(".next1").click(function() {
                owlSelector1.trigger("next.owl.carousel");
            });
            // Go to the previous item
            $(".prev1").click(function() {
                // With optional speed parameter
                // Parameters has to be in square bracket '[]'
                owlSelector1.trigger("prev.owl.carousel", [300]);
            });
            var owlSelector = $(".featured-slider");
            // Go to the next item
            $(".next2").click(function() {
                owlSelector.trigger("next.owl.carousel");
            });
            // Go to the previous item
            $(".prev2").click(function() {
                // With optional speed parameter
                // Parameters has to be in square bracket '[]'
                owlSelector.trigger("prev.owl.carousel", [300]);
            });
        },
        animate_js: () =>{
            AOS.init({
                duration: 1000,
                once: true,
            }); 
        },
        mesonary: function() {
            if ($('.grid').length) {
                var $grid = $('.grid').isotope({
                    itemSelector: '.grid-item',
                    percentPosition: false,
                    masonry: {
                        // use outer width of grid-sizer for columnWidth
                        columnWidth: '.grid-sizer',
                        gutter: 30
                    }
                });
                $grid.imagesLoaded().progress(function() {
                    $grid.isotope('layout')
                });
            }
        },
        // IMG to SVG
        imgToSvg: function() {
            function jetix_svg() {
                jQuery('img').each(function() {
                    var jQueryimg = jQuery(this);
                    var imgClass = jQueryimg.attr('class');
                    var imgURL = jQueryimg.attr('src');
                    jQuery.get(imgURL, function(data) {
                        // Get the SVG tag, ignore the rest
                        var jQuerysvg = jQuery(data).find('svg');

                        // Add replaced image's classes to the new SVG
                        if (typeof imgClass !== 'undefined') {
                            jQuerysvg = jQuerysvg.attr('class', imgClass + ' replaced-svg');
                        }
                        jQuerysvg = jQuerysvg.removeAttr('xmlns:a');
                        // Replace image with new SVG
                        jQueryimg.replaceWith(jQuerysvg);

                    }, 'xml');

                });
            }
            $(document).each(function() {
                jetix_svg();
            })
        },
        dark_light: () => {
            /** Dark Light Version*/
            var html = document.querySelector('html'),
                darkLight = document.querySelector('.dark-light')
            if (darkLight) {
                darkLight.addEventListener('click', function() {
                    if (html.getAttribute('data-theme') === 'light') {
                        html.setAttribute('data-theme', 'dark')
                        localStorage.setItem('selected-theme', 'dark');

                    } else {
                        html.setAttribute('data-theme', 'light')
                        localStorage.setItem('selected-theme', 'light');
                    }
                })
            }
        },
        // StopPropagations elements
        stopPropagationElements: () => {
            $('.search-input-wrap').click(function(e) {
                e.stopPropagation()
            })
        },
        // Document click to hide elements
        elementHide: () => {
            $(document).click(function() {
                $('.search-input-wrap').removeClass('active')
            })
        },
        init: function() {
            allfunction.menu_bar()
            allfunction.imgToSvg()
            allfunction.feature_slider()
            allfunction.search_bar()
            allfunction.mesonary()
            allfunction.stopPropagationElements()
            allfunction.elementHide()
            allfunction.dark_light()
            allfunction.animate_js()
        },
    }

    $(document).ready(function() {
        allfunction.init();
        // Show the first tab and hide the rest
            $('#tabs-nav li:first-child').addClass('active');
            $('.tab-content').hide();
            $('.tab-content:first').show().addClass('active');

            // Click function
            $('#tabs-nav li').click(function(){
                $('#tabs-nav li').removeClass('active');
                $(this).addClass('active');
                $('.tab-content').hide().removeClass('active');
                
                var activeTab = $(this).find('a').attr('href');
                $(activeTab).fadeIn().addClass('active');
                return false;
            });
    });

})(jQuery);



$(window).load(function() {
    $(this).scrollTop(0);
    $(".preloader-wrapper").fadeOut(60);//The time it take
    $('body').addClass('preloader')

    if ($('.feature-slider-wrapper').length) {
        $(".owl-carousel").owlCarousel({
            onInitialized: counter,
            onTranslated: counter,
            autoHeight: true,
            autoplay:true,
            animateOut: 'fadeOut',
            items: 1,
        });

        function counter(event) {
            var element = event.target;
            var items = event.item.count;
            var item = event.item.index + 1;
            $('#counter').html('<span>' + '0' + item + '</span> / ' + '0' + items)
        }
    }
        /*LazyLoad*/
        var lazyLoadInstance = new LazyLoad({
            elements_selector: ".lazy",
            effect: "fadeIn"
        });
        lazyLoadInstance.update();
        lazyLoadInstance.loadAll();
});
//   window.onbeforeunload = function() {
//     window.scrollTo(0, 0);
//   };