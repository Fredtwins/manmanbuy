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
var categoryId = parseInt(getSearch('categoryId')); //获取到必须传的值
var pageid = 1;
// 路径
$.get('http://139.199.192.48:9090/api/getcategorybyid', { categoryid: categoryId }, function(data) {
    console.log(data);
    $('.wkl_bread > .breadcrumb').html(template('wkl-break', data.result[0]))
})

// 点击路径最后一个
$(document).on('click', '.wkl_bread > .breadcrumb > li', function() {
    $.get('http://139.199.192.48:9090/api/getproductlist', { categoryid: 0 || categoryId }, function(data) {
        $('.wkl-product-list').html(template('wkl_product_tpl', data.result))
    })
})

// 媒体列表渲染
$.get('http://139.199.192.48:9090/api/getproductlist', { categoryid: categoryId, pageid: pageid || 1 }, function(data) {
    var pagesize = data.pagesize; //每页数据大小
    var totalCount = data.totalCount //商品总条数
        // 商品总条数/每页数据大小=总页数,页数要ceil
    var pagelist = Math.ceil(totalCount / pagesize); //一共分几页
    var pageArr = [];
    for (var i = 1; i <= pagelist; i++) {
        pageArr.push(i); //把页面存在一个数组里面
    }
    data.pageArr = pageArr; //给返回指定对象,给她找个数组  
    data.pageArr.size = pageArr.length;
    console.log(data)
    $('.wkl-product-list').html(template('wkl_product_tpl', data.result))
    paging(data, pagelist)
})

// 跳详情页
$(document).on('click', '.media', function() {
    var productId = $(this).attr('data-id');
    var pageid = $('#selePage').val(); //字符串
    pageid = !!pageid ? pageid : 1;
    // console.log(!!pageSize);
    location.href = './../../html/wkl/listdetail.html?productId=' + productId + '&pageid=' + pageid;
})

// 分页
// 分页函数
function paging(data, pagelist) {
    // 分页功能
    // var page = 1; //存页码,默认是第一页
    // 选项框存页码
    $('.wkl-page .row').html(template('wkl-page_tpl', data.pageArr));

    //选项框页码功能 
    $('#selePage').on('change', function() {
        pageid = parseInt($(this).val());
        console.log(pageid);
        tpl(data, pageid)
    })

    // 上一页
    $('#prev').on('click', function() {
        if (pageid == 1) {
            alert('已经是第一页');
            return;
        }
        pageid -= 1;
        $('#selePage').val(pageid);
        tpl(data, pageid);

    })

    // 下一页
    $('#next').on('click', function() {
        if (pageid == pagelist) {
            alert('已经是最后一页了');
            return;
        }
        pageid += 1;
        $('#selePage').val(pageid);
        console.log(pageid);
        tpl(data, pageid);
    })
}

// 页码模板渲染
function tpl(data, pageid) {
    $.get('http://139.199.192.48:9090/api/getproductlist', { categoryid: categoryId, pageid: pageid || 1 }, function(data) {
        $('.wkl-product-list').html(template('wkl_product_tpl', data.result));
    })
}