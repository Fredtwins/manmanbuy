//处理location.search获取值
function getSearch(key) {
    var str = location.search;
    var newstr = str.slice(1);
    var strArr = newstr.split('&');
    var strObj = {};
    var newArr = [];
    for (var i = 0; i < strArr.length; i++) {
        newArr = strArr[i].split('=');
        strObj[newArr[0]] = newArr[1]
    }
    return key ? strObj[key] : strObj;
}

var productId = parseInt(getSearch('productId'));
var pageid = parseInt(getSearch('pageid'));
console.log(pageid);

// 内容渲染
$.get('http://139.199.192.48:9090/api/getproduct', { productid: productId, pageid: pageid }, function(data) {
    console.log(data);
    $('.wkl_detail_count').prepend(template('wkl-article', data.result[0]));

    wklBreak(data);
})

// 路径
function wklBreak(data) {
    // 路径最后一个
    var productName = data.result[0].productName;
    var index = productName.indexOf(' ');
    var newStr = productName.slice(0, index); //字符串截取
    var categoryId = data.result[0].categoryId; //分类ID
    console.log(newStr);

    $.ajax({
        type: 'get',
        url: 'http://139.199.192.48:9090/api/getcategorybyid',
        data: {
            categoryid: categoryId,
        },
        success: function(data) {
            data.newStr = newStr;
            // console.log(data);
            $('.wkl_detail_nav').html(template('wkl-break', data));
        }
    })

}

// 评论
$.get('http://139.199.192.48:9090/api/getproductcom', { productid: productId }, function(data) {
    console.log(data);
    $('.count-list').html(template('wkl-count', data.result))
})