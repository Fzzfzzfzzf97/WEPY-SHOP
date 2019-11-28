import wepy from 'wepy'
export default class extends wepy.mixin {


    data = {
        // 轮播图
        swiperList: [],
        vertical: false,
        interval: 2000,
        duration: 500,
        // 分类列表
        cateItems: [],
        // 楼层数据
        floorData: [],
        cateList: [],
        secondCate: []
    };

    methods = {
        goGoodsList(url) {
            wepy.navigateTo({
                url: url
            })
        }
    };

    onLoad() {
        this.getSwiperList();
        this.getCateItems();
        this.getFloorData();
        this.getCateList();
    }

    // 获取轮播图数据
    async getSwiperList() {
        const { data: res } = await wepy.get('/home/swiperdata');
        if (res.meta.status !== 200) {
            return wepy.baseToast("轮播图")
        }
        this.swiperList = res.message;
        this.$apply();
    }

    // 获取分类参数
    async getCateItems() {
        const { data: res } = await wepy.get('/home/catitems');
        this.cateItems = res.message;
        this.$apply();
    }

    // 获取楼层参数
    async getFloorData() {
            const { data: res } = await wepy.get('/home/floordata');
            this.floorData = res.message
                // console.log(this.floorData);
            this.$apply();
        }
        // 获取分类参数
    async getCateList() {
        const { data: res } = await wepy.get('/categories')

        if (res.meta.status !== 200) {
            return wepy.baseToast()
        }

        this.cateList = res.message
        this.secondCate = res.message[0].children
        this.$apply()
    }
}