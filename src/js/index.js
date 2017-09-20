//首页导航栏的
// $.get('http://139.199.192.48:9090/api/getindexmenu', function(data) {
//     $('.wkl_nav').html(template('wkl_nav_tpl', data.result));
//     // 点击隐藏显示事件
//     $('.wkl_nav .hid:nth-last-child(-n+4)').hide();
//     $('.wkl_nav .hid').eq(7).on('click', function() {
//         $('.wkl_nav .hid:nth-last-child(-n+4)').slideToggle();
//     })
// });

$('.wkl_nav .hid:nth-last-child(-n+4)').hide();
$('.wkl_nav .hid').eq(7).on('click', function() {
    $('.wkl_nav .hid:nth-last-child(-n+4)').slideToggle();
})

//折扣的请求
$.get('http://139.199.192.48:9090/api/getmoneyctrl', function(data) {
    $('.wkl_count').prepend(template('wkl_count_tpl', data.result));

});

//点击回到顶部
$('.other_span').on('click', function() {
    $('body,html').animate({
        scrollTop: 0,
    }, 500);
});

//判断返回顶部消失条件
$(window).scroll(function() {
    /* 判断滚动条 距离页面顶部的距离 100可以自定义*/
    if ($(window).scrollTop() > 150) {
        $(".other_span").stop().fadeIn(500);
    } else {
        $(".other_span").stop().fadeOut(500);
    }
});

//广告的事件
$('.wkl_khd').on('click', function() {
    // $(this).attr('class', 'hide')
    $(this).slideUp();
});

setInterval(function() {
    $('.wkl_khd').slideUp();
}, 4000);