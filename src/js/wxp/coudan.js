


//点击店铺名展开下拉选项
$('#shopevent').on('click',function(){
    $('#shopName').siblings('div').hide();
    $('#shopName').slideToggle();
    setRotate('#shopevent');
})


//点击区域名展开下拉选项
$('#regionevent').on('click',function(){
    $('#regionName').siblings('div').hide();
    $('#regionName').slideToggle();
    setRotate('#regionevent');
})

//点击全部价格展开下拉选项
$('#allprice').on('click',function(){
    $('.hotprice').siblings('div').hide();
    $('.hotprice').slideToggle();
    setRotate('#allprice');
})

//点击搜索按钮展开下拉选项
$('.btn-search').on('click',function(){
    $('.searchbox').siblings('div').hide();
    $('.searchbox').slideToggle();
})


//设置三角形翻转
function setRotate(id){
    if ($(id).next().css('transform')=='none') {
        $(id).next().css('transform','rotate(180deg)')
    }else {
        $(id).next().removeAttr("style")
    }
}

//请求店铺名数据渲染展示
$.ajax({
    url:'http://139.199.192.48:9090/api/getgsshop',
    type:'get',
    success: function (data) {
        $('#shopName').html(template('shopName-tpl',data.result));
        $('#shopName').children().children().first().append("<span></span>").children('span').addClass('glyphicon glyphicon-ok');
    }
})


//请求区域数据渲染展示
$.ajax({
    url:'http://139.199.192.48:9090/api/getgsshoparea',
    type:'get',
    success: function (data) {
        $('#regionName').html(template('regionName-tpl',data.result));
        $('#regionName').children().children().first().append("<span></span>").children('span').addClass('glyphicon glyphicon-ok');
    }
})

//记录shopid和areaid
var shopid,
    areaid;


//商品初始列表渲染
$.ajax({
    url:'http://139.199.192.48:9090/api/getgsproduct',
    type:'get',
    data:{
        shopid:shopid || 2,
        areaid:areaid || 0
    },
    success: function (data) {
        $('#cd-productlist').html(template('productlist-tpl',data.result));
    }
})



//监听店铺列表获取shopid值请求数据并且更新商品列表
$(document).on('click','#shopName li', function () {
    $(this).siblings().children('span').removeClass();
    $(this).append("<span></span>").children('span').addClass('glyphicon glyphicon-ok');
    $('#shopevent').text($(this).text());
    $('#shopName').hide();
    shopid = $(this).attr('data-id');
    $.get('http://139.199.192.48:9090/api/getgsproduct',{shopid:shopid||0,areaid:areaid||0}, function (data) {
        $('#cd-productlist').html(template('productlist-tpl',data.result));
    })
})

//监听区域列表获取shopid值请求数据并且更新商品列表
$(document).on('click','#regionName li', function () {
    $(this).siblings().children('span').removeClass();
    $(this).append("<span></span>").children('span').addClass('glyphicon glyphicon-ok');
    $('#regionevent').text($(this).text().substring(0,2));
    $('#regionName').hide();
    areaid = $(this).attr('data-id');
    $.get('http://139.199.192.48:9090/api/getgsproduct',{shopid:shopid||0,areaid:areaid||0}, function (data) {
        $('#cd-productlist').html(template('productlist-tpl',data.result));
    })
})

//点击顶部返回顶部
$('.footer_return').on('click', function () {
    $('body,html').animate({
        scrollTop: 0,
    }, 500);
})