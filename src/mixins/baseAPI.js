import wepy from 'wepy'
wepy.baseToast = function(str) {
    wepy.showToast({
        title: '获取' + str + '参数失败', //提示的内容,
        icon: 'none', //图标,
        duration: 2000, //延迟时间,
    });

}