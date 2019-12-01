import wepy from 'wepy'
export default class extends wepy.mixin {
    data = {
        // 查询关键词
        query: '',
        // 商品分类的Id
        cid: '',
        // 页码值
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 10,
        goodslist: [],
        isOver: false,
        isloading: false
    }
    methods = {
            goGoodsDetail(id) {
                wepy.navigateTo({ url: './goods_detail/main?goods_id=' + id });
            }
        }
        // 获取商品列表数据
    async getGoodsList(cb) {
        // 即将发起请求时，将 isloading 重置为 true
        this.isloading = true
        const { data: res } = await wepy.get('/goods/search', {
            query: this.query,
            cid: this.cid,
            pagenum: this.pagenum,
            pagesize: this.pagesize
        })

        if (res.meta.status !== 200) {
            return wepy.baseToast()
        }

        this.goodslist = [...this.goodslist, ...res.message.goods]
        this.total = res.message.total
            // 当数据请求完成后，将 isloading 重置为 false
        this.isloading = false
        this.$apply();
        cb && cb();
    }
    onLoad(options) {
        this.query = options.query || ''
        this.cid = options.cid || ''
        this.getGoodsList()
    }
    onReachBottom() {
        if (this.pagenum * this.pagesize >= this.total) {
            this.isOver = !this.isOver;
            return
        }
        // console.log('触底了')
        this.pagenum++
            this.getGoodsList()
    }
    onPullDownRefresh() {
        setTimeout(() => {
            this.pagenum = 1;
            this.total = 0;
            this.goodslist = [];
            this.isOver = this.isloading = false;
            this.getGoodsList(() => {
                wepy.stopPullDownRefresh();
            });
        }, 1000);

    }
}