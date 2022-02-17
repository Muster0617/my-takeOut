<template>
	<view  class="wrapper" style="background-color: #f4f4f4;overflow-y: scroll;height: 100vh;">
		<u-subsection :list="list" :current="current" bgColor="white" @change="sectionChange"></u-subsection>
		<view class="deliver" v-show="current==0">
			<u-empty mode="order" icon="http://cdn.uviewui.com/uview/empty/car.png" v-if="shopList.length==0">
			</u-empty>
			<view v-else style="width: 100%;">
				<view v-for="(item,index) in shopList" :key="index"
					style="padding: 10px;width: 95%;background-color: #FFFFFF; margin: 0 auto;position: relative;margin-top: 5px;border-radius: 5px;">
					<view style="display: flex;flex-direction: row;width: 100%;" @click="getGoods(item.openid)">
						<image :src="item.logo" mode="aspectFill" style="width: 40px;height: 40px;"></image>
						<text style="margin-left: 10px;font-weight: bolder;">{{item.shop}}
							<u-icon name="arrow-right" style="margin-left: 20px;"></u-icon>
						</text>
						<text style="position: absolute;right: 10px;">
							待发货
						</text>
					</view>
					<view style="display: flex;flex-direction: row;margin-top: 10px;align-items: center;">
						<view class="" v-for="(row,indexx) in item.list.slice(0,3)" :key="indexx"
							style="display: flex;flex-direction: column;margin-right: 5px;">
							<image :src="row.image" mode="aspectFill" style="width: 60px;height: 60px;"></image>
							<text style="font-size: 10px;width: 60px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-top: 5px;">{{row.food}}</text>
						</view>
						<text v-show="item.list.length>=3" style="margin-left: 10px;position: relative;bottom: 25rpx;">...</text>
						<view style="display: flex;flex-direction: column;position: absolute;right: 10px;">
							<text style="font-weight: bolder;text-align: center;">￥{{item.price}}</text>
							<text style="font-size: 12px;">共 {{item.num}} 件</text>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="payment" v-show="current==1">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
		</view>
		<view class="comment" v-show="current==2">
			<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/car.png" text="暂无评论">
			</u-empty>
		</view>

	</view>
	<!--  -->
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '待发货'
					},
					{
						name: '待付款'
					},
					{
						name: '待评价'
					}
				],
				current: 0,
				shopList: []
			}
		},
		onShow() {
			let token= uni.getStorageSync('takeOut_Token')
			if(token){
				if(uni.getStorageSync('shopList')){
					this.shopList = JSON.parse(uni.getStorageSync('shopList'))
				}
			}
		},
		methods: {
			sectionChange(index) {
				this.current = index;
				console.log(this.current)
			},
			getGoods(openid) {
				uni.navigateTo({
					url: '../goods/index?openid=' + openid,
				})
			
			},
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		background-color: #f4f4f4;
	}

	.u-empty {
		margin-top: 20vh !important;
	}

</style>
