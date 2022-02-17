<template>
	<view>
		<view class="nearbyItem" v-for="(item,index) in nearbyshopData" :key="index" @click="getGoods(item.openid)">
			<image :src="item.logo" mode=""></image>
			<view class="nearbyItem_main">
				<text class="nearbyItem_title">{{item.shop}}</text>
				<view class="nearbyItem_main_time">
					<text class="nearbyItem_text">月收 {{item.capita*item.duration}}份</text>
					<text class="nearbyItem_text">约{{item.duration}}分钟</text>
				</view>
				<view class="nearbyItem_main_info">
					<text class="nearbyItem_text">起送¥{{item.delivering}}</text>
					<text class="nearbyItem_text">配送¥{{item.physical}}</text>
					<text class="nearbyItem_text">人均¥{{item.capita}}</text>
				</view>
				<view>
					<u-icon name="calendar"></u-icon>
					<text class="nearbyItem_text" style="margin-left: 5rpx;">
						{{item.types}}
					</text>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		props: {
			nearbyshopData: {
				default: {},
				required: true,
				type:Array
			}
		},
		methods: {
			getGoods(openid) {
				uni.navigateTo({
					url: '../goods/index?openid=' + openid,
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.nearbyItem {
		width: 100%;
		display: flex;
		flex-direction: row;
		border-bottom: solid 1px rgb(222, 222, 222);
		height: 110px;
		margin-bottom: 10upx;
		padding: 10rpx;

		image {
			width: 116px;
			height: 100px;
		}

		.nearbyItem_text {
			font-size: 12px;
			color: rgb(139, 139, 139);
		}

		.nearbyItem_main {
			margin-left: 5px;
			width: 67%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.nearbyItem_title {
				font-size: 16px;
				font-weight: bolder;
			}

			.nearbyItem_main_time {
				display: flex;
				justify-content: space-between;
			}

			.nearbyItem_main_info {
				text {
					margin-right: 20px;
				}
			}
		}

	}
</style>
