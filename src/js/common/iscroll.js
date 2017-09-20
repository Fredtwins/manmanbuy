function setGo(box) {
    var obj = {
        tab: function(callback) {
            /* 
        需求:
        1. 点击的时候,移动距离不能大于5px
        2. 点击的时候,时间停留不能大于200ms
        3. 点击的时候,判断手指的个数,不能大于1
        */

            // var box = document.querySelector("div");
            // 声明变量,保存当前的手指的位置
            var startX, startY;
            var startTime, entTimg;

            box.addEventListener("touchstart", function(e) {
                // 判断手指的个数
                if (e.targetTouches.length > 1) {
                    return;
                }
                // 判断移动的距离
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;

                // 什么变量保存当前的点击的事件
                startTime = Date.now();
                // console.log(startX, startY, startTime);

            })

            // 手指离开的时候
            box.addEventListener("touchend", function(e) {
                // 判断手指的个数
                if (e.changedTouches.length > 1) {
                    return;
                }
                //获取当前的手指的位置
                var endX = e.changedTouches[0].clientX;
                var endY = e.changedTouches[0].clientY;

                // 当前离开的时间
                entTimg = Date.now();

                // 最后才判断,这个到底是不是点击事件
                // 判断手指一开始的距离和现在的距离的位置(因为不知道是左还是右,所以取绝对值)
                if (Math.abs(endX - startX) > 5) {
                    return;
                } else if (Math.abs(endY - startY) > 5) {
                    return;
                } else if (entTimg - startTime > 200) {
                    return;
                }

                // 最后条件都不满足的时候,就是点击事件
                // console.log("你终于是移动的点击事件了");
                callback();

            })
        },
        swper: function(callback) {
            // var box = document.querySelector("div");
            /* 
            * 需求条件
              1. 手指的个数在目标不能超过1个,
              2. 移动的距离不能太小
              3. 时间不能太长 500ms
            */
            var startX, startY; //手指移入的距离,和结束的距离
            var startTime, endTime; //开始时间变量,和手指离开时间变量
            var fand; //方向变量


            box.addEventListener("touchstart", function(e) {
                // 判断手指的个数
                if (e.targetTouches.length > 1) {
                    return;
                }
                // 判断移动的距离(先获取当前的距离,在手指离开的时候相减就得到距离)
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;

                // 获取当前的时间(手指离开事件,和这个时间相减,判断时间的长短)
                startTime = Date.now();
            })

            // 手指松开的时候
            box.addEventListener("touchend", function(e) {
                // 判断手指的个数,超过1个,直接不算拖动
                if (e.changedTouches.length > 1) {
                    return;
                }


                // 判断此时的距离,当当前的距离-开始的距离,的距离太短的时候,不算是拖动,
                var endX = e.changedTouches[0].clientX;
                var endY = e.changedTouches[0].clientY;
                // 当小于5的时候,不算拖动,判断条件大于5,里面执行是向左还是向右
                if (Math.abs(endX - startX) > 5) {
                    fand = (endX - startX) > 0 ? "right" : "left";
                } else if (Math.abs(endY - startY) > 5) { //同理,竖直方向也是这样
                    fand = (endY - startY) > 0 ? "down" : "up";
                } else { //当都不成立的时候,则停止这个函数,没必要判断下去了
                    // console.log("条件都不成立");
                    return;
                }
                // console.log(fand);

                // 判断时间 
                endTime = Date.now();
                // console.log(startTime);
                // console.log(endTime);
                if (endTime - startTime > 500) {
                    // console.log("时间超过了");
                    return;
                }

                // console.log(fand);
                callback(fand);

            })
        }
    }
    return obj;
}