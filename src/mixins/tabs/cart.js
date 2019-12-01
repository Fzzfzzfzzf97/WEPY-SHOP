import wepy from 'wepy'
export default class extends wepy.mixin {


    data = {
        cart: [],
        checked: false
    };

    components = {};

    methods = {
        clearCart() {
            wepy.clearStorageSync('cart');
            this.cart = [];
        },
        onClickButton() {

        },
        onChange() {
            this.checked = !this.checked;
        },
        // 监听商品数量变化
        countChange(e) {
            // console.log(e);
            this.$parent.updateGoodsCount(e.target.dataset.id, e.detail)
        },
        // 商品选中状态会触发
        statusChange(id, { detail: isChecked }) {
            this.$parent.updateGoodsStatus(id, isChecked)
        }
    };

    onLoad() {}
    onShow() {
        this.cart = this.$parent.globalData.cart
    }
    computed = {
        // 判断购物车是否为空
        isEmpty() {
            if (this.cart.length <= 0) {
                return true
            }
            return false
        }
    }
}