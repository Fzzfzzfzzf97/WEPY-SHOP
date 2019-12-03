import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        addressInfo: null,
        cart: []
    }
    onShow() {
        // 读取收货地址
        this.addressInfo = wepy.getStorageSync('address') || null;

    }
    onLoad() {
        // 从购物车列表中，将勾选的列表过滤出来
        this.cart = this.$parent.globalData.cart.filter(x => x.isCheck)
        this.$apply();
        console.log(this.cart);
    }
    methods = {
        async chooseAddress() {
            // 选择收货地址
            const res = await wepy.chooseAddress().catch(err => err)
                // console.log(res)

            if (res.errMsg !== 'chooseAddress:ok') {
                return
            }
            this.addressInfo = res
            wepy.setStorageSync('address', res)
            this.$apply()
            console.log(this.addressInfo)
        }
    }
    computed = {
        isHaveAddress() {
            // if (this.addressInfo === null) {
            //     return true
            // } else {
            //     return false
            // }
            return this.addressInfo;
        },
        addressStr() {
            if (this.addressInfo === null) {
                return ''
            }

            return this.addressInfo.provinceName + this.addressInfo.cityName + this.addressInfo.countyName + this.addressInfo.detailInfo
        }
    }
}