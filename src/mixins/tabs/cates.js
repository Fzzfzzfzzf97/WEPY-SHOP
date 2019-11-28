import wepy from 'wepy'
export default class extends wepy.mixin {
    data = {
        // 分类参数
        cateList: [],
        secondCate: [],
        active: 0,
        // 屏幕高度
        wh: ''
    }
    methods = {
        onChange(event) {
            // console.log(event.detail)
            this.secondCate = this.cateList[event.detail].children
            console.log(this.secondCate)
        },
        goGoodsList(id) {
            console.log(id);
            wepy.navigateTo({ url: '/pages/goods_list?cid=' + id });

        }
    }
    onLoad() {
            this.getCateList();
            this.getWindowHeight();
        }
        // 动态获取屏幕高度
    async getWindowHeight() {
            const res = await wepy.getSystemInfo();
            // console.log(res);
            this.wh = res.windowHeight;
            console.log(this.wh);

            this.$apply();
        }
        // 获取分类参数
    async getCateList() {
        const { data: res } = await wepy.get('/categories')
        if (res.meta.status !== 200) {
            return wepy.baseToast()
        }
        this.cateList = res.message
        this.secondCate = this.cateList[0].children
        this.$apply()
        console.log(this.cateList)
    }
}