// 当前文档在垂直方向已滚动的像素值，初始化为0
let currentY = 0;
// 取得所有板块的节点（不包含 footer 页脚）
let scrollItems = document.getElementsByTagName('section');
let scrollComputedStyle;
let curHeight;
let scrollTimeout;

window.addEventListener('wheel', scrollThrottler);

window.onload = getHeight;
window.onresize = getHeight;

function getHeight() {
    scrollComputedStyle = window.getComputedStyle(scrollItems[0], null);
    curHeight = Number(scrollComputedStyle['minHeight'].slice(0,-2))
}

function scrollThrottler(e) {
    if (!scrollTimeout) {
        scrollHandler(e);
        /*
        * 触发滚动事件后为 scrollTimeout 赋值，并在0.8秒后重置为 null
        * setTimeout 期间若 scrollTimeout != null（等效于队列中 scrollHandler 正在执行）
        * 则不会执行 if 判断内的语句，从而实现节流
        * */
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
        }, 800);
    }
}

function scrollHandler(e) {
    // 页面下滑
    if (e.deltaY > 0) {
        window.scrollBy({
            top: curHeight,
            left: 0,
            behavior: 'smooth'
        });
        console.log('scroll down');
    }
    // 页面上滑
    else if (e.deltaY < 0) {
        window.scrollBy({
            top: -curHeight,
            left: 0,
            behavior: 'smooth'
        });
        console.log('scroll up');
    }
}
