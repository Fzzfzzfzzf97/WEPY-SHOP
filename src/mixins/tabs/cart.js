import wepy from 'wepy'
export default class extends wepy.mixin {


    data = {
        cart: [],
        showDialog: false
    };

    components = {};

    methods = {
        submitOrder() {
            if (this.amount <= 0) {
                return wepy.baseToast('订单金额不能为空！')
            }

            wepy.navigateTo({
                url: '/pages/order'
            })
        },
        showDia() {
            this.showDialog = true
        },
        clearCart() {
            wepy.clearStorageSync('cart');
            this.cart = [];
            this.showDialog = false
                // this.$parent.saveCartToStorage();
        },
        cancelCart() {
            this.showDialog = false;
        },
        onClickButton() {

        },
        isAllChecked(e) {
            // console.log(e.detail);

            this.$parent.updateAllGoodsStatus(e.detail);
        },
        // 监听商品数量变化
        countChange(e) {
            // console.log(e);
            this.$parent.updateGoodsCount(e.target.dataset.id, e.detail)
        },
        // 商品选中状态会触发
        statusChange(id, { detail: isChecked }) {
            this.$parent.updateGoodsStatus(id, isChecked)
        },
        close(id) {
            this.$parent.removeGoodsById(id)
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
        },
        // 总价格
        amount() {
            let total = 0;
            this.cart.forEach(x => {
                if (x.isCheck) {
                    total += x.price * x.count
                }
            })
            return total * 100;
        },
        // 计算全选
        isFullChecked() {
            // 获取所有商品个数
            const allCount = this.cart.length;
            let c = 0;
            this.cart.forEach(x => {
                if (x.isCheck) {
                    c++;
                }
            })
            return allCount === c;
        }
    }
}