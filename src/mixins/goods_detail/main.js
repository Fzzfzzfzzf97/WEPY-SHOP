import wepy from 'wepy'
export default class extends wepy.mixin {
    data = {
        goodsDetailList: {},
        goods_id: '',
        tabIndex: 0,
        // 收货地址
        addressInfo: '请选择收货地址'
    }
    methods = {
        // 加入购物车
        addToCart() {
            // console.log(this.$parent.globalData.cart);
            wepy.showToast({
                title: '加入购物车成功', //提示的内容,
                icon: 'success', //图标,
                duration: 1000, //延迟时间,
                mask: true, //显示透明蒙层，防止触摸穿透,
                success: res => {}
            });
            this.$parent.addGoodsToCart(this.goodsDetailList)
        },
        // 点击预览图片
        preview(current) {
            wepy.previewImage({
                urls: this.goodsDetailList.pics.map(x => x.pics_big), //需要预览的图片链接列表,
                current: current
            });
        },
        // 获取收货地址
        async chooseAddress() {
            const res = await wepy.chooseAddress();
            this.addressInfo = res.provinceName + res.cityName + res.countyName + res.detailInfo;
            wepy.setStorageSync('address', res);
            this.$apply();
        }
    }
    onLoad(options) {
        this.goods_id = options.goods_id
        this.getGoodsDetailList();
    }
    async getGoodsDetailList(o) {
        const { data: res } = await wepy.get('/goods/detail', {
            goods_id: this.goods_id
        });
        this.goodsDetailList = res.message;
        // console.log(this.goodsDetailList);
        this.$apply();
    }
    computed = {
        // 所有已经勾选的商品的数量
        total() {
            return this.$parent.globalData.total
        }
    }
}