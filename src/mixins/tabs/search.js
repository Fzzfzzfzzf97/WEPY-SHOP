import wepy from 'wepy'
export default class extends wepy.mixin {
    data = {
        value: '',
        suggestList: [],
        // 搜索历史列表
        kwList: []
    };
    methods = {
        onSearch(e) {
            // console.log(e.detail);
            const kw = e.detail.trim()
            if (kw.length == 0) {
                return;
            }
            // 把用户填写的搜索关键字，保存到 Storage  中
            if (this.kwList.indexOf(kw) === -1) {
                this.kwList.unshift(kw)
            }

            // 数组的 slice 方法，不会修改原数组，而是返回一个新的数组
            this.kwList = this.kwList.splice(0, 10)
            wepy.setStorageSync('kw', this.kwList);
            wepy.navigateTo({ url: '/pages/goods_list?query=' + kw });
        },
        onClear() {
            this.suggestList = [];
        },
        onChange(e) {
            this.value = e.detail.trim();
            clearTimeout(this.timer);
            if (e.detail.trim().length == 0) {
                this.suggestList = [];
                return;
            }
            this.timer = setTimeout(() => {
                this.getSuggestList(e.detail)
            }, 800)
        },
        // 导航到商品详情页面
        goMain(id) {
            wepy.navigateTo({ url: '/pages/goods_detail/main?goods_id=' + id });
        },
        // 清除搜索历史记录
        clearHistory() {
            this.kwList = [];
            wepy.setStorageSync('kw', []);
        }
    };
    computed = {
        isShowHistory() {
            return !this.value;
        }
    };
    // 获取搜索结果列表
    async getSuggestList(searchStr) {
        const { data: res } = await wepy.get('/goods/qsearch', { query: searchStr });
        this.suggestList = res.message;
        // console.log(this.suggestList)
        this.$apply();
    };
    onShow() {
        const kwList = wx.getStorageSync('kw') || []
        this.kwList = kwList
            // console.log(this.kwList)
    };
}