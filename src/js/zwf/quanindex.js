require('./../common/gotop.js'); //返回顶部

$.get('http://139.199.192.48:9090/api/getcoupon', function(data) {
    $('.zwf-coupon .row').html(template('coupon-tpl', data.result));
    //不用这个,万一用户右击点击链接打开,那么参数就那不到了
    // var couponId = localStorage.setItem('couponId', JSON.stringify(data.result.couponId));
    console.log(data);
})

$(document).on('click contextmenu', 'a', function() {
    var newHref = $(this).attr('href') + '?couponid=' + $(this).attr('data-id');
    $(this).attr('href', newHref);
    console.log(newHref);
    // return false;
})