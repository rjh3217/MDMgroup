$(function () {

    $(document).ready(function () {

        $('#fullpage').fullpage({

            scrollingSpeed: 500,

            onLeave: function (anchorLink, index) {

                /* 헤더 */
                if (index === 3 || index === 4) {
                    $('header').addClass('header-dark');
                } else {
                    $('header').removeClass('header-dark');
                }


                /* 페이지 네비 */
                $('.page_nav a').removeClass('active');

                $('.page_nav a')
                    .eq(index - 1)
                    .addClass('active');


                /* SC5가 아니면 푸터 닫기 */
                if (index !== 5) {
                    $('footer').removeClass('footer-up');
                }

            }

        });


        /* ========================================
           SC5 푸터
        ======================================== */

        let footerClosing = false;

        $('#sc5').on('wheel', function (e) {

            /* 푸터가 닫히는 중이면 스크롤 완전히 차단 */
            if (footerClosing) {

                e.preventDefault();
                e.stopPropagation();

                return;

            }


            /* 아래로 스크롤 → 푸터 등장 */
            if (e.originalEvent.deltaY > 0) {

                e.preventDefault();
                e.stopPropagation();

                $('footer').addClass('footer-up');

            }


            /* 위로 스크롤 → 푸터 닫기 */
            else if (
                e.originalEvent.deltaY < 0 &&
                $('footer').hasClass('footer-up')
            ) {

                e.preventDefault();
                e.stopPropagation();

                footerClosing = true;

                /* 푸터 닫기 */
                $('footer').removeClass('footer-up');


                /* CSS transition이 끝난 후 스크롤 다시 허용 */
                setTimeout(function () {

                    footerClosing = false;

                }, 600);

            }

        });


        /* ========================================
           페이지 네비 클릭
        ======================================== */

        $('.page_nav a').on('click', function (e) {

            e.preventDefault();

            const index = $(this).index() + 1;

            $.fn.fullpage.moveTo(index);

        });


        /* ========================================
           고탑 버튼
        ======================================== */

        $('.btn-top').click(function (e) {

            e.preventDefault();

            $('footer').removeClass('footer-up');

            $.fn.fullpage.moveTo(1);

        });


        /* ========================================
           팝업이 떠있는 동안 fullpage 스크롤 막기
        ======================================== */

        $('.popupbox').on('wheel', function (e) {

            e.preventDefault();
            e.stopPropagation();

        });


        /* ========================================
           팝업 닫기
        ======================================== */

        $('.botton a, .xbutton').click(function () {

            $('.popupbox').hide();

        });

    });

});