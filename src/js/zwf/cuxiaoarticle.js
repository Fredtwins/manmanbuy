require('./../common/gotop.js');
//处理location.search
function getSearch(key) {
    var str = location.search; //?cg_id=1&cg_type=aa
    var newstr = str.slice(1); //cg_id=1&cg_type=aa
    var strArr = newstr.split('&'); //[cg_id=1,cg_type=aa];
    var strObj = {};
    var newArr = [];
    for (var i = 0; i < strArr.length; i++) {
        // strArr[i].split('=')  //strArr[1]=='cg_id=1'  strArr[2]=='cg_type=aa'
        newArr = strArr[i].split('=');
        strObj[newArr[0]] = newArr[1]
    }
    return key ? strObj[key] : strObj;
}
var productId = getSearch('productId'); //获取到商品ID值
var pageid = getSearch('pageId'); //获取页码值

/* 
接收商品页码,和商品ID,
1.根据页码请求数据,后台返回值
2.根据商品ID,查询返回的值,找到对应的对象
3.渲染
*/
// 接收商品页面,和商品ID,
$.get('http://139.199.192.48:9090/api/getmoneyctrl?pageid=' + pageid, function(data) {
    console.log(data.result);
    var newObj = {};
    for (var i = 0; i < data.result.length; i++) {
        if (productId == data.result[i].productId) {
            newObj = data.result[i];
        }
    }
    $('.content .row').html(template('zwf_cuiaoarticle_tpl', newObj))
    console.log(newObj)
})