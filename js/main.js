$(function () {

    $(document).ready(function () {

        $('#fullpage').fullpage({

            scrollingSpeed: 500,

            onLeave: function (anchorLink, index) {

                if (index === 3 || index === 4) {
                    $('header').addClass('header-dark');
                } else {
                    $('header').removeClass('header-dark');
                }

                $('.page_nav a').removeClass('active');

                $('.page_nav a')
                    .eq(index - 1)
                    .addClass('active');

                if (index !== 5) {
                    $('footer').removeClass('footer-up');
                }

            }

        });


        /* 팝업이 떠있는 동안 fullpage 스크롤 막기 */
        $('.popupbox').on('wheel', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });


        /* 팝업 닫기 */
        $('.botton a, .xbutton').click(function(){

            $('.popupbox').hide();

        });

    });

});