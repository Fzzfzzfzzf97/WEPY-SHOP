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
        }
    };
    onLoad() {}
    onShow() {
        this.cart = this.$parent.globalData.cart
            // console.log(this.goodsList);
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