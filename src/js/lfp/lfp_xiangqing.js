function getSearch(key) { // '?cg_id=1&cg_type=op'
    var searchstr = location.search.slice(1); // 'cg_id=1&cg_type=op'
    var searchArr = searchstr.split("&"); // ['cg_id=1', 'cg_type=op']
    var searchObj = {},
        tempArr;

    for (var i = 0; i < searchArr.length; i++) {
        tempArr = searchArr[i].split('='); // ['cg_id', 1]    ['cg_type', 'op']
        searchObj[tempArr[0]] = tempArr[1]; // { cg_id:1, cg_type: 'op' }
    }

    return key ? searchObj[key] : searchObj;
    // return 90;
}
var id = getSearch('productId');
// console.log(id)

$.get('http://139.199.192.48:9090/api/getdiscountproduct', { productid: id }, function(data) {
    $('.cu-content').html(template('lfp_xq', data.result));
    // console.log($value.productImg);
    // console.log(data)

});