import wepy from 'wepy'
export default class extends wepy.mixin {
    data = {
        goodsDetailList: {},
        goods_id: '',
        tabIndex: 0
    }
    methods = {
        onClickIcon() {},

        onClickButton() {},
        // 点击预览图片
        preview(current) {
            wepy.previewImage({
                urls: this.goodsDetailList.pics.map(x => x.pics_big), //需要预览的图片链接列表,
                current: current
            });
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
        console.log(this.goodsDetailList);
        this.$apply();
    }
}