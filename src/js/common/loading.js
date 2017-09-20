
/**
 * ajax添加loading
 * 通过JS拼接添加到body中
 *  在ajax请求前和结束时触发显示遮罩层
 */

var loadingHTML =
 ' <div class="overlay">'+
    '<img src="../../../public/img/loading.gif" />'+
 '</div>';

$('body').append(loadingHTML); //添加遮罩层

$(document).on('ajaxStart', function () {
    $(".overlay").show();
})
$(document).on('ajaxStop', function () {
    $(".overlay").hide();
})


