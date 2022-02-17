<template>
	<view class="wrapper">
		<u-popup v-model="show" mode="bottom" border-radius="14" height="60%" :closeable="true">
			<view style="width: 100%;display: flex;justify-content: center;">
				<text style="font-size: 16px;margin-top: 14px;font-weight: bolder;">选择收获地址</text>
			</view>
			<scroll-view scroll-y="true" style="height: 75%;margin-top: 5px;">
				<view>
					<u-cell-group>
						<u-cell-item icon="star" :title="item.address"
							:label="`${item.name}${item.sex}      ${item.phone}`" v-for="(item,index) in addressList"
							:key="index" :arrow="false" @click="isAddress(index)">
							<view @click.stop="goAddress('编辑收货地址',index)">
								<u-icon name="edit-pen"></u-icon>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
			</scroll-view>
			<view style="width: 80%;margin: 0 auto;margin-top: 15px;">
				<u-button @click="goAddress('新增收获地址')">新增收获地址</u-button>
			</view>
		</u-popup>
		<view
			style="margin: 0 auto;height: 111px;border-bottom: 1px solid #e6e6e6;width: 95vw;display: flex;justify-content: center;align-items: center;">
			<view v-if="Object.keys(this.address).length==0" @click="selectAddress"
				style="border: 1px solid #ffaa00;width: 80%;height: 100rpx;border-radius: 15px;display: flex;justify-content: center;align-items: center;">
				<text style="color: #ffaa00;font-size: 18px;">选择收获地址</text>

			</view>
			<view
				style="position: absolute;width: 90%;height: 80px;display: flex;justify-content: center;flex-direction: column;padding: 10px;border-radius: 10px;background-color: #f7f7f7;"
				v-else @click="selectAddress">
				<view style="font-size: 20px;font-weight: bolder;margin-bottom: 10px;">
					<text>{{address.address}}</text>
				</view>
				<view style="display: flex;flex-direction: row;font-size: 14px;color: #9c9d9f;">
					<view style="margin-right: 10px;">
						<text style="margin-right: 5px;">{{address.name}}</text>
						<text>{{address.sex}}</text>
					</view>
					<text>{{address.phone}}</text>
				</view>
			</view>
		</view>
		<view style="margin-top: 10px;">
			<scroll-view scroll-y="true" style="height: calc(100vh - 400px);">
				<view class="" v-for="(item,index) in payList.list" :key="index"
					style="padding: 10px;display: flex;flex-direction: row;">
					<image :src="item.image" mode="" style="width: 110px;height: 86px;border-radius: 10px;"></image>
					<view style="display: flex;flex-direction: column;margin-left: 5px;">
						<text style="font-size: 18px;">{{item.food}}</text>
						<text style="font-size: 14px;color: #b5b5b5;">×{{item.counter}}</text>
					</view>
					<view style="margin-left: auto;display: flex;align-items: center;">
						<text style="font-size: 18px;width: 100px;">单价：{{item.unit}}元</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view
			style="display: flex;flex-direction: row-reverse;border-bottom: 1px solid #e6e6e6;width: 95vw;margin: 0 auto;height: 60px;">
			<text style="margin-right: 10px;font-size: 18px;line-height: 60px;">配送费￥{{payList.postage}}元</text>
		</view>
		<view
			style="position: fixed;bottom: 0;display: flex;flex-direction: row;justify-content: space-between;align-items: center; width: 100vw;height: 60px;">
			<text
				style="text-align: center;margin-left: 20px;font-size: 18px;font-weight: bolder;">合计￥{{payList.price}}元</text>
			<u-button type="success" style="margin-right: 20px;width: 100px;" @click="pay">支付</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payList: [],
				show: false,
				title: '标题',
				addressList: [],
				address: {}
			}
		},
		onLoad(option) {
			this.payList = JSON.parse(option.payList)
		},
		onShow() {
			if (uni.getStorageSync('address')) {
				this.addressList = JSON.parse(uni.getStorageSync('address'))
			}
		},
		methods: {
			selectAddress() {
				this.show = !this.show
			},
			pay() {
				let token= uni.getStorageSync('takeOut_Token')
				if(!token){
					uni.showToast({
						title: '请先登陆',
						icon: 'none'
					})
					return
				}
				if (Object.keys(this.address).length == 0) {
					uni.showToast({
						title: '请填写收货信息',
						icon: 'none'
					})
				} else {
					let that=this
					uni.showModal({
						title: '确认支付',
						content: '是否确认支付这份订单',
						complete: function(res) {
							if (res.confirm) {
								uni.showToast({
									title: '支付成功',
									complete() {
										that.payList.address = that.address
										console.log(that.payList)
										let shopList = uni.getStorageSync('shopList')
										if (!shopList) {
											let data = []
											data.push(that.payList)
											uni.setStorageSync('shopList', JSON.stringify(data))
										} else {
											let res = JSON.parse(shopList)
											res.unshift(that.payList)
											uni.setStorageSync('shopList', JSON.stringify(res))
										}
										that=''
										uni.switchTab({
											url: '../order/index'
										})

									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}



			},
			isAddress(index) {
				this.address = this.addressList[index]
				this.show = false
			},
			goAddress(option, index) {
				if (option == '编辑收货地址') {
					uni.navigateTo({
						url: './address?option=' + JSON.stringify({
							option: option,
							index: index
						})
					})
				} else {
					uni.navigateTo({
						url: './address?option=' + JSON.stringify({
							option: option
						})
					})
				}

			}
		}
	}
</script>

<style>

</style>
