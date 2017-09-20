//获取品牌大全页面传过来的brandtitleid
function getSearch(key) {
    var searchStr = location.search.slice(1); //删除第一位并返回一个新数组,不会改变原数组
    var searchArr = searchStr.split("&"); //将字符串从&的地方分隔成数组
    var searchObj = {},
        tempArr;
    for (var i = 0; i < searchArr.length; i++) {
        tempArr = searchArr[i].split("=");
        searchObj[tempArr[0]] = tempArr[1];
    }
    return key ? searchObj[key] : searchObj;
}

//截取分类名
function getName(name) {
    var index = name.indexOf('十大品牌');
    var newName = name.slice(0, index);
    console.log(newName);
    return newName;
}

//获取brandtitleid和商品分类名进行模板渲染
var brandtitleid = getSearch('brandtitleid');

$.get('http://139.199.192.48:9090/api/getbrand', { brandtitleid: brandtitleid || 0 }, function(data) {
    $('#brand-classify').html(template('brand-classify-tpl', data.result))
})


//获取对应的分类名
var name = decodeURIComponent(getSearch('name'));
var brandtext = getName(name) + '哪个牌子好';
$('.categoryname').text(brandtext);
$('.topheader').text(brandtext);


//提取商品默认id渲染评论模板
var productid = 0;
//请求数据渲染品牌子类销量排行

$.get('http://139.199.192.48:9090/api/getbrandproductlist', { pagesize: 4, brandtitleid: brandtitleid }, function(data) {
    $('#brand-childs').html(template('brand-childs-tpl', data.result));
    productid = data.result['0'].productId || 0;
})


//子类销量排行标题
var childsname = getName(name) + '产品销量排行';
$('.salesheader').text(childsname);
//评论标题
var commentname = getName(name) + '最有用的用户评论';
$('.commentheader').text(commentname);
//默认第一个商品评论模板渲染
$.get('http://139.199.192.48:9090/api/getproductcom', { productid: productid }, function(data) {
    $('#brand-comment').html(template('comment-tpl', data.result));
})

//获取商品ID请求评论数据
$('#brand-childs').on('click', 'li', function() {
    var productid = $(this).attr('data-id');
    $.get('http://139.199.192.48:9090/api/getproductcom', { productid: productid }, function(data) {
        $('#brand-comment').html(template('comment-tpl', data.result));
    });
})

//点击顶部返回顶部
$('.footer_return').on('click', function() {
    $('body,html').animate({
        scrollTop: 0,
    }, 500);
})