//数据回显
// $.get('http://139.199.192.48:9090/api/getinlanddiscount', function(data) {

//     $('.product').html(template('lfp_zhekous', data.result));
//     var imgArr = $('.product img').get();
//     var newImgArr = [];
//     for (var i = 0; i < imgArr.length; i++) {
//         var str = $('.product img').get(i).getAttribute("data-original");
//         var newStr = str.slice(10);
//         var index = newStr.indexOf('" alt');
//         newStr = newStr.slice(0, index);
//         newImgArr.push(newStr);
//     }
//     // console.log(newImgArr);
//     for (var j = 0; j < newImgArr.length; j++) {
//         $('.product img').get(j).setAttribute("data-original", newImgArr[j]);
//         $(function() {
//             $("img.lazy").lazyload({ effect: "fadeIn" });
//         });
//     }
// });


var page;

function loadBox(pageIndex) {
    console.log(pageIndex)
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getinlanddiscount',
        type: 'get',
        success: function(data) {

            var result = data.result
            var list = result.length
            var arr = [];
            var col = 4 //显示个数
            var start = col * pageIndex - col; //初始位置
            var end = col * pageIndex //结束位置
            for (var i = start; i < end; i++) {
                arr.push(result[i])
                var html = template('lfp_zhekous', arr)
                if (end >= result.length) {
                    $('.loadMore').off('click')
                    $('.loadMore').html('没有更多数据了')
                }
            }
            page = list / col;
            $('#product').append(html)
            console.log(html)
            console.log(pageIndex)
            $('.loadMore').attr('data-id', pageIndex)


        }
    })
}

loadBox(1)
$(document).on('scroll', function() {
    var boxHeight = $('body').height();
    var windowTop = $(document).scrollTop();
    var height = boxHeight - windowTop
    var cp = $('.loadMore').attr('data-id')
    if (height < $(window).height()) {
        cp++
        if (cp > page) {
            $(document).off('scroll')
            return
        }
        loadBox(cp)
    }
})

$('.loadMore').on('click', function() {
    var cp = $('.loadMore').attr('data-id')
    cp++
    loadBox(cp)
})