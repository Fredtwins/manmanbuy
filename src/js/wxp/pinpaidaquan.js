//渲染品牌列表
$.get('http://139.199.192.48:9090/api/getbrandtitle', function (data) {
    $('#brand').html(template('hottop-tpl',data.result))
})


//点击品牌列表跳转页面
$('#brand').on('click','li', function () {
    var id = $(this).attr('data-id');
    var name = $(this).children('p').html();
    location.href='./pinpaiclassify.html?brandtitleid='+ id +'&name='+name;
})

//点击顶部返回顶部
$('.footer_return').on('click', function () {
    $('body,html').animate({
        scrollTop: 0,
    }, 500);
})