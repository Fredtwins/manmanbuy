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
var couponid = getSearch('couponid'); //获取到必须传的值
// console.log(couponid);
$.get('http://139.199.192.48:9090/api/getcouponproduct', { couponid: couponid }, function(data) {
    console.log(data);
    $('.zwf_shop-list').html(template('zwf_shop_list', data.result))
})