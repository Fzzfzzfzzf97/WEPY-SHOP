import wepy from 'wepy'
export default class extends wepy.mixin {
    data = {
        value: '',
        suggestList: []
    }
    methods = {
            onSearch(e) {
                console.log(e.detail);
            },
            onClear() {
                this.suggestList = [];
            },
            onChange(e) {
                clearTimeout(this.timer);
                if (e.detail.trim().length == 0) {
                    this.suggestList = [];
                    return;
                }
                this.timer = setTimeout(() => {
                    this.getSuggestList(e.detail)
                }, 500)
            },
            // 导航到商品详情页面
            goMain(id) {
                wepy.navigateTo({ url: '/pages/goods_detail/main?goods_id=' + id });
            }
        }
        // 获取搜索结果列表
    async getSuggestList(searchStr) {
        const { data: res } = await wepy.get('/goods/qsearch', { query: searchStr });
        this.suggestList = res.message;
        console.log(this.suggestList)
        this.$apply();
    }
}