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

            /* ========================================
               아래로 스크롤
            ======================================== */

            if (e.originalEvent.deltaY > 0) {

                /* 푸터가 아직 올라오지 않았을 때만
                   푸터를 올리고 스크롤을 막음 */
                if (!$('footer').hasClass('footer-up')) {

                    e.preventDefault();
                    e.stopPropagation();

                    $('footer').addClass('footer-up');

                }

                /* 푸터가 이미 올라와 있으면
                   SC5에서 계속 머무름 */
                return;
            }


            /* ========================================
               위로 스크롤
            ======================================== */

            if (e.originalEvent.deltaY < 0) {

                /* 푸터가 올라와 있으면
                   푸터만 닫음 */
                if ($('footer').hasClass('footer-up')) {

                    e.preventDefault();
                    e.stopPropagation();


                    /* 이미 닫히는 중이면 무시 */
                    if (footerClosing) {
                        return;
                    }


                    footerClosing = true;


                    /* 푸터 닫기 */
                    $('footer').removeClass('footer-up');


                    /* CSS transition 완료 후
                       다시 스크롤 허용 */
                    setTimeout(function () {

                        footerClosing = false;

                    }, 700);

                }

            }


            /* 푸터가 닫히는 동안에는
               fullpage 스크롤 차단 */
            if (footerClosing) {

                e.preventDefault();
                e.stopPropagation();

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

            footerClosing = false;

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