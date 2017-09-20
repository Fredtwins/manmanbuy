require('./../common/gotop.js');

// 数据回显
$.get('http://139.199.192.48:9090/api/getsitenav', function(data) {
    console.log(data);
    $('.zwf-shop-navigation .row').html(template('zwf_navigation', data.result));
})