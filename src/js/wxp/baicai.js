//设置顶栏拖动
function scroll(){
    var myscroll=new IScroll("#wrapper",{
        scrollX: true,
        scrollY: false,
        hScrollbar:false,
        vScrollar : false,
        vScroll:false
    })
    myscroll.refresh()  //dom树变化时刷新IScroll
}

//获取分类ul总宽度
var widthSum = 10;
function getWidth(){
    for (var i = 0; i < $('.list').children().length; i++) {
        widthSum += $('.list').children().eq(i).innerWidth();
    }
}


//请求数据渲染分类列表模板
$.get('http://139.199.192.48:9090/api/getbaicaijiatitle', function (data) {
    $('#wrapper').html(template('top-tab-tpl',data.result));
    //先给默认分类添加一个标记
    $('.list').children().get(0).classList.add('active');
    getWidth();
    $('.list').width(widthSum);
    scroll();
})



//获取分类ID和添加样式
var titleiid = 0;
var sumleft = 0;
$('#wrapper').on('click','li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    titleiid = $(this).attr('data-id');
    //点击传入分类ID更新商品列表数据
    $.get('http://139.199.192.48:9090/api/getbaicaijiaproduct',{titleid:titleiid||0} ,function (data) {
        $('#bc-productlist').html(template('bc-productlist-tpl',data.result));
    })
})


//传入分类ID请求商品列表数据
$.get('http://139.199.192.48:9090/api/getbaicaijiaproduct',{titleid:titleiid||0} ,function (data) {
    $('#bc-productlist').html(template('bc-productlist-tpl',data.result));
})

//点击顶部返回顶部
$('.footer_return').on('click', function () {
    $('body,html').animate({
        scrollTop: 0,
    }, 500);
})