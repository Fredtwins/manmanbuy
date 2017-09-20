//公用底部的点击返回顶部
$('.footer_return').on('click', function () {
    $('body,html').animate({
        scrollTop: 0,
    }, 500);
})