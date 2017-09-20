//点击回到顶部
$('.other_span').on('click', function() {
    $('body,html').animate({
        scrollTop: 0,
    }, 500);
});

//判断返回顶部消失条件
$(window).scroll(function() {
    /* 判断滚动条 距离页面顶部的距离 100可以自定义*/
    if ($(window).scrollTop() > 150) {
        $(".other_span").stop().fadeIn(500);
    } else {
        $(".other_span").stop().fadeOut(500);
    }
});


//获取分类的标题信息
$.get('http://139.199.192.48:9090/api/getcategorytitle', function(data) {
    $('.wkl_list').prepend(template('list_box_tpl', data.result));
});

// 详细
var flag = true;
$(document).on('click', '.list_box', function() {
        var $this = $(this);
        if (!!!$this.next().hasClass("list_tab")) {
            var titleid = parseInt($(this).attr('data-titleId'));
            $.get('http://139.199.192.48:9090/api/getcategory', { titleid: titleid }, function(data) {
                console.log(data);
                $this.after(template('list-child', data.result));
            })
        }
        $this.siblings().next('table').hide();
        $this.next('table').toggle();
        //判断符号上翻下翻
        var top = $this.find('.glyphicon-menu-down');
        var bottom = $this.find('.glyphicon-menu-up');
        top.attr('class', 'glyphicon glyphicon-menu-down hide');
        if (flag == true) {
            bottom.attr('class', 'glyphicon glyphicon-menu-up show');
            flag = false;

        } else {
            bottom.attr('class', 'glyphicon glyphicon-menu-up hide');
            top.attr('class', 'glyphicon glyphicon-menu-down show');
            flag = true;
        }



    })
    // 详细列表点击跳具体
$(document).on('click', 'td', function() {
    var categoryId = $(this).attr('data-id');
    location.href = './searchlist.html?categoryId=' + categoryId;
})