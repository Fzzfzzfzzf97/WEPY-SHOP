import wepy from 'wepy'
export default class extends wepy.mixin {


    data = {
        goodsList: []
    };

    components = {};

    methods = {};
    onLoad() {}
    onShow() {
        this.goodsList = this.$parent.globalData.cart;
        // console.log(this.goodsList);

    }
}