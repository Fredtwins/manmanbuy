require('./../common/gotop.js'); //返回顶部
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
    // console.log(data);
    // for (var i = 0; i < data.result.length; i++) {

    // }
    $('.zwf_shop-list').html(template('zwf_shop_list', data.result))
})

// 点击显示图片
$(document).on('click', '.media', function abc() {
    var $this = $(this);
    var src = $(this).find('img').attr('src');
    console.log(src);
    var div = $('.zwf-zezhao');
    div.show();
    $('.zwf-zezhao img').attr('src', src);
    // 调用左右滑动函数
    setGo(div.get(0)).swper(function(fand) {
            if (fand == 'left') { //后一个
                if (!!!$this.next().get(0)) { //当是第一个的时候,没有上一个兄弟,返回undefined,那么就是false
                    alert('最后一个了');
                    return;
                }
                // console.log();
                // console.log($this.next());
                var src = $this.next().find('img').attr('src');
                $('.zwf-zezhao img').attr('src', src);
                $this = $this.next();
                // console.log($this);
                // console.log(132)
            } else if (fand == 'right') { //前一个
                if (!!!$this.prev().get(0)) {
                    alert('已经是第一个了');
                    return;
                }
                var src = $this.prev().find('img').attr('src');
                $('.zwf-zezhao img').attr('src', src);
                $this = $this.prev();
                // console.log(46)
            }
        })
        // 调用点击
    setGo(div.get(0)).tab(function() {
        div.fadeOut();
        // $this.unbind(('click', abc)); //解绑事件
    })
})

// 左右滑动事件