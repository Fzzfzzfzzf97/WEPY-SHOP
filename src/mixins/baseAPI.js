import wepy from 'wepy'
const baseURL = 'https://www.zhengzhicheng.cn/api/public/v1'
wepy.baseToast = function(str) {
    wepy.showToast({
        title: '获取' + str + '参数失败', //提示的内容,
        icon: 'none', //图标,
        duration: 2000, //延迟时间,
    });

}

// 封装GET
wepy.get = function(url, data = {}) {
        return wepy.request({
            url: baseURL + url,
            method: 'GET',
            data
        })
    }
    //   封装POST
wepy.post = function(url, data = {}) {
    return wepy.request({
        url: baseURL + url,
        method: 'POST',
        data
    })
}