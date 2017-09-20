require('./../common/gotop.js');
// 省钱控模板显示功能

$.get('http://139.199.192.48:9090/api/getmoneyctrl', function(data) {
    var pagesize = data.pagesize; //每页数据大小
    var totalCount = data.totalCount //商品总条数
        // 商品总条数/每页数据大小=总页数,页数要ceil
    var pagelist = Math.ceil(totalCount / pagesize); //每页显示的5条
    var pageArr = [];
    for (var i = 1; i <= pagelist; i++) {
        pageArr.push(i); //把页面存在一个数组里面
    }
    data.pageArr = pageArr; //给返回指定对象,给她找个数组
    data.pageArr.size = pageArr.length;
    console.log(data);
    $('.zwf-product-list').html(template('zwf_product_tpl', data.result));

    // 分页功能  
    paging(data, pagelist);
})

// 跳详细页
$(document).on('click', '.media', function() {
    var productId = parseInt($(this).attr('data-id'));
    var pageId = parseInt($('#selePage').val()); //当前页码
    pageId = !!pageId == false ? 1 : pageId;
    location.href = './../../html/zwf/cuxiaoarticle.html?productId=' + productId + "&pageId=" + pageId;
})

// 分页函数
function paging(data, pagelist) {
    console.log(data);
    // 分页功能
    var page = 1; //存页码,默认是第一页
    // 选项框存页码
    $('.zwf-page .row').html(template('page_tpl', data.pageArr));

    //选项框页码功能 
    $('#selePage').on('change', function() {
        page = parseInt($(this).val());
        console.log(page);
        tpl(data, page)
    })

    // 上一页
    $('#prev').on('click', function() {
        if (page == 1) {
            alert('已经是第一页');
            return;
        }
        page -= 1;
        $('#selePage').val(page);
        tpl(data, page);

    })

    // 下一页
    $('#next').on('click', function() {
        if (page == pagelist) {
            alert('已经是最后一页了');
            return;
        }
        page += 1;
        $('#selePage').val(page);
        console.log(page);
        tpl(data, page);
    })
}

// 页码模板渲染
function tpl(data, page) {
    $.get('http://139.199.192.48:9090/api/getmoneyctrl', { pageid: page }, function(data) {
        $('.zwf-product-list').html(template('zwf_product_tpl', data.result));
        console.log(data)
    })
}