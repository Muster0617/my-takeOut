<template>
	<view style="background-color: #f5f5f5;height:100%;">
		<view style="height: 200px;background-color: #ffed1e;">
			<view style="display: flex;flex-direction: row;padding: 10px;">
				<u-avatar :src="userInfo.avatarUrl" style="margin-top: 20px;"></u-avatar>
				<text style="font-weight: bolder;font-size: 18px;line-height: 50px;margin-left: 10px;margin-top: 20px;"
					@click="login">{{userInfo.nickName?userInfo.nickName:'点击登陆'}}</text>
				<view class=""
					style="margin-left: auto;width: 30%;display: flex;justify-content: space-around;margin-top: 20px;">
					<text @click="settings">设置</text>
					<text>客服</text>
				</view>
			</view>
			<view style="display: flex;flex-direction: row; justify-content: space-around;margin-top: 10px;">
				<view
					style="width: 20%;display: flex;flex-direction: column; justify-content: center;align-items: center;">
					<u-icon name="shopping-cart" size="80"></u-icon>
					<text>购物车</text>
				</view>
				<view
					style="width: 20%;display: flex;flex-direction: column; justify-content: center;align-items: center;">
					<u-icon name="star" size="80"></u-icon>
					<text>收藏</text>
				</view>
				<view
					style="width: 20%;display: flex;flex-direction: column; justify-content: center;align-items: center;">
					<u-icon name="tags" size="80"></u-icon>
					<text>足迹</text>
				</view>
				<view
					style="width: 20%;display: flex;flex-direction: column; justify-content: center;align-items: center;">
					<u-icon name="calendar" size="80"></u-icon>
					<text>红包卡卷</text>
				</view>
			</view>
		</view>
		<view
			style="width: 95vw;height: 125px;position: relative;bottom:20px; border-radius: 10px;margin: 0 auto;background-color: #ffffff;">
			<view style="display: flex;justify-content: space-between;height: 40px;">
				<text style="margin-left: 10px;font-size: 16px;font-weight: bolder;line-height: 40px;">我的订单</text>
				<text style="margin-right: 10px;line-height: 40px;font-size: 14px;color: #cfcfcf;">全部订单</text>
			</view>
			<view
				style="display: flex;flex-direction: row; justify-content: space-around;margin-top: 10px;font-size: 14px;">
				<view style="display: flex;flex-direction: column; justify-content: center;align-items: center;">
					<u-icon name="file-text" size="70"></u-icon>
					<text style="line-height: 30px;">待付款</text>
				</view>
				<view style="display: flex;flex-direction: column; justify-content: center;align-items: center;">
					<u-icon name="bag" size="70"></u-icon>
					<text style="line-height: 30px;">待收货</text>
				</view>
				<view style="display: flex;flex-direction: column; justify-content: center;align-items: center;">
					<u-icon name="gift" size="70"></u-icon>
					<text style="line-height: 30px;">待使用</text>
				</view>
				<view style="display: flex;flex-direction: column; justify-content: center;align-items: center;">
					<u-icon name="list" size="70"></u-icon>
					<text style="line-height: 30px;">待评价</text>
				</view>
				<view style="display: flex;flex-direction: column; justify-content: center;align-items: center;">
					<u-icon name="rmb" size="70"></u-icon>
					<text style="line-height: 30px;">退款/售后</text>
				</view>
			</view>

		</view>
	</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onShow() {
			let token= uni.getStorageSync('takeOut_Token')
			if(token){
				this.userInfo={
					nickName:"小谢",
					avatarUrl:'../../static/logo.png'
				}
			}else{
				this.userInfo=''
			}
		},
		methods: {
			settings(){
				uni.navigateTo({
					url: './settings'
				})
			},
			login() {
				if(!this.userInfo){
					uni.navigateTo({
						url: './login'
					})
				}
				
			}

		}
	}
</script>

<style>
	uni-page-body{
		height: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
