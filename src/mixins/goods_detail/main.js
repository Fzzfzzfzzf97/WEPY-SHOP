import wepy from 'wepy'
export default class extends wepy.mixin {
    data = {
        goodsDetailList: {},
        goods_id: '',
        tabIndex: 0
    }
    methods = {
        onClickIcon() {},

        onClickButton() {}
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
        console.log(this.goodsDetailList);
        this.$apply();
    }
}