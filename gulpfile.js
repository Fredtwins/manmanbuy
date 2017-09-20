var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserify = require('browserify'); //用commonJS必须要装这个插件
var source = require('vinyl-source-stream'); //这个包可以把普通的数据流转为vinyl对象
var buffer = require('vinyl-buffer'); //这个是把vinyl对象文件中的数据转为buffer方式存储
var htmlReplace = require('gulp-html-replace'); //提取公共部分文件插件

// html压缩处理
gulp.task('html', function() {
    gulp.src(['./src/**/*.html', 'index.html'])
        .pipe(htmlReplace({ //提取公共部分文件
            header: gulp.src('./src/html/common/header.html'), //头部
            goTop: gulp.src('./src/html/common/goTop.html'), //返回顶部
            footer: gulp.src('./src/html/common/footer.html'), //底部
            style: gulp.src('./src/html/common/style.html'), //head标签里面引用的css样式  包含bootstrap.css  和lib.css
        }))
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist'));
})


// less处理和压缩
gulp.task('less', function() {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(cleanCss())
        //.pipe(concat('lib.css'))
        .pipe(gulp.dest('dist/css'))
})

// js处理第三方包 ,用数组存起来.配置要打包的第三包路径
var jsLibs = [
    './node_modules/art-template/lib/template-web.js',
    './node_modules/jquery/dist/jquery.js', //先jq
    './node_modules/bootstrap/dist/js/bootstrap.js', //后bootstarp
    './node_modules/jquery-form/dist/jquery.form.min.js', //ajaxForm插件
    './node_modules/iscroll/build/iscroll.js', //滑动插件
    './src/js/common/iscroll.js', //原生移动端点击和左右滑动封装
    './src/js/common/loading.js'
];
// 合并所有的第三方包为一个JS
gulp.task('jsLib', function() {
    gulp.src(jsLibs)
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

// 自己的js模块 打包CommonJS模块
/* 
打包CommonJS模块
1.其中src/js/common目录下的文件不需要打包,因为将来那个页面脚步需要它,require即可
只要require了,就自动打包到了对应的页面脚本
2. 剩下其他目录的JS都要打包,每个JS都对应一个html页面,他们是这些页面的入口
但是browserify不支持通配符写法,我们只能一个一个写,
    一个一个写比较费力,我们这里采用一个循环结构处理,搞循环结构,通常需要一个对象
    或者数组,我们搞一个存储所有需要打包JS路径的数组,然后遍历打包
*/
var jsModules = [
    // 首页
    'src/js/index.js',
    // 王开朗
    'src/js/wkl/search.js',
    'src/js/wkl/listdetail.js',
    'src/js/wkl/searchlist.js',
    // 周文飞
    'src/js/zwf/couponproduct.js',
    'src/js/zwf/cuxiao.js',
    'src/js/zwf/cuxiaoarticle.js',
    'src/js/zwf/HzSite.js',
    'src/js/zwf/quanindex.js',
    // 梁发鹏
    'src/js/lfp/commons.js',
    'src/js/lfp/lfp_shengqian.js',
    'src/js/lfp/lfp_xiangqing.js',
    'src/js/lfp/lfp_zhekou.js',
    // 吴晓鹏
    'src/js/wxp/baicai.js',
    'src/js/wxp/coudan.js',
    'src/js/wxp/pinpaiclassify.js',
    'src/js/wxp/pinpaidaquan.js'
];
/* 
  1.其中 browserify(JS路径),需要写活
  2.source(JS名字),存后的JS名字,需要写活
  3.还有打包后的JS路径结构最好与打包前一致
*/
gulp.task('js', function() {
    jsModules.forEach(function(jsPath) {
        var pathArr = jsPath.split('/'); //切割数组
        var jsName = pathArr.pop(); //拿到最后一个,返回值是我JS的名字
        pathArr.shift(); //删除第一个,这些都会改变我原来的数组
        browserify(jsPath, { debug: true }).bundle() //打包index.js,有返回值,返回的数据格式不gulp
            .pipe(source(jsName)) //js是我要写入进去的文件名,和我src的文件名要一样
            .pipe(buffer()) //这个和前面两个是成对出现的
            .pipe(uglify())
            .pipe(gulp.dest('dist/' + pathArr.join('/'))) //数组的join方法,是变成了字符串,我写入路径,是区src和文件名中间那个,是我呀的路径
    })
})


// 添加统一打包的任务
gulp.task('build', function() {
    gulp.run(['html', 'less', 'jsLib', 'js']);
})

// 监听文件变化,自动打包
gulp.task('default', function() {
    // 默认先执行这个
    gulp.run('build');
    // 监听html
    gulp.watch(['src/**/*.html', 'index.html'], function() {
            gulp.run('html');
        })
        // 监听less
    gulp.watch('./src/less/**/*.less', function() {
            gulp.run('less');
        })
        // 监听JS
    gulp.watch('./src/**/*.js', function() {
        gulp.run('js');
    })

})