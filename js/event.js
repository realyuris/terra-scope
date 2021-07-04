let curAnchor = location.hash; // 当前页面锚点位置，初始为首页""
let curAnchorIndex = 0;
let navAnchorList = [];
let curSection;

window.onload = function() {
    getAnchorList();
    addNavClickEvent();
}

/*
* 页面滚动行为
* */
{
    let navList = document.getElementsByClassName('navMenuItem');
    let scrollTimeout;

    window.addEventListener('wheel', function (e) {
        // 禁止默认滚动事件，避免页面滑动过程中出现停滞现象
        e.preventDefault();
        scrollThrottler(e);
    },{ passive: false });

    function getAnchorList() {
        for (let i = 0; i < navList.length; i++) {
            navAnchorList[i] = navList[i].children[0].hash;
        }
        console.log(navAnchorList);
    }

    function scrollThrottler(e) {
        if (!scrollTimeout) {
            scrollHandler(e);
            scrollTimeout = setTimeout(function () {
                scrollTimeout = null;
            }, 800)
        }
    }

    function scrollHandler(e) {
        // 页面下滑
        if (e.deltaY > 0 && curAnchorIndex >= 0 && curAnchorIndex < navAnchorList.length - 1) {
            curAnchorIndex++;
            document.querySelector('.navMenuItem.active').classList.remove('active');
            document.getElementsByClassName('navMenuItem')[curAnchorIndex].classList.add('active');
            location.hash = navAnchorList[curAnchorIndex];
            // console.log('scroll down' + '\ncurrent index:' + curAnchorIndex);
        }
        // 页面上滑
        else if (e.deltaY < 0 && curAnchorIndex > 0 && curAnchorIndex <= navAnchorList.length - 1) {
            curAnchorIndex--;
            document.querySelector('.navMenuItem.active').classList.remove('active');
            document.getElementsByClassName('navMenuItem')[curAnchorIndex].classList.add('active');
            location.hash = navAnchorList[curAnchorIndex];
            // console.log('scroll up' + '\ncurrent index:' + curAnchorIndex);
        }
    }
}

/*
* 导航栏行为
* */
{
    let navMenuItems;

    function addNavClickEvent() {
        navMenuItems = document.getElementsByClassName('navMenuItem');
        for (let i = 0; i < navMenuItems.length; i++) {
            navMenuItems[i].addEventListener('click', addNavActiveClass);
        }
        console.log(navMenuItems)
    }

    function addNavActiveClass() {
        document.querySelector('.navMenuItem.active').classList.remove('active');
        navMenuItems = document.getElementsByClassName('navMenuItem');
        let activeMenuItem = this;
        activeMenuItem.classList.add('active');
        // 获取当前页面锚点索引
        for (let i = 0; i < navMenuItems.length; i++) {
            if (navMenuItems[i] === activeMenuItem ) return curAnchorIndex = i;
        }
    }
}
