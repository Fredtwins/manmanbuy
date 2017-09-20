var ren = document.getElementById("#ren");
// 点击返回顶部
ren.onclick = function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}