import wepy from 'wepy'
export default class extends wepy.mixin {


    data = {
        // 轮播图
        swiperList: [],
        vertical: false,
        interval: 2000,
        duration: 500,
        // 分类列表
        cateItems: []
    };

    methods = {};

    onLoad() {
        this.getSwiperList();
        this.getCateItems();
    }

    // 获取轮播图数据
    async getSwiperList() {
        const { data: res } = await wepy.request(
            'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata'
        );
        if (res.meta.status !== 200) {
            return wepy.baseToast("轮播图")
        }
        this.swiperList = res.message;
        this.$apply();
    }

    // 获取分类参数
    async getCateItems() {
        const { data: res } = await wepy.request(
            'https://www.zhengzhicheng.cn/api/public/v1/home/catitems'
        );
        this.cateItems = res.message;
        this.$apply();
    }
}