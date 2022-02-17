<template>
	<view class="wrapper">
		<view class="search" @click="getNearbyshopData">
			<u-search v-model="search" action-text="取消" @custom="goBack" @change="seekValue">
			</u-search>
		</view>
		<view class="search_list" v-show="search">
			<view class="search_list_item" v-for="(item,index) in searchList" :key="index"
				@click="getGoods(item.openid)">
				<u-icon name="calendar" style="color: #C0C0C0;margin-right: 8px;"></u-icon><text>{{item.shop}}</text>
			</view>
			<view class="search_list_item" v-show="searchList.length==0">
				<u-icon name="calendar" style="color: #C0C0C0;margin-right: 8px;"></u-icon><text>没有更多搜索结果</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getNearbyshops
	} from '../../api/index.js'
	import {
		debounce
	} from '../../utils/index.js'
	export default {
		data() {
			return {
				search: '',
				nearbyshopData: [],
				searchList: []
			}
		},
		methods: {
			async getNearbyshopData() {
				if (this.nearbyshopData.length == 0) {
					const res = await getNearbyshops()
					this.nearbyshopData = res.data
				}
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			seekValue:debounce(function(){
				if (this.search) {
					this.searchList = this.nearbyshopData.filter((item, index) => {
						return item.shop.includes(this.search) == true
					})
				}
			},200),
			getGoods(openid) {
				uni.navigateTo({
					url: '../goods/index?openid=' + openid,
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		padding: 10px;
		padding-top: 0;

		.search {
			margin-bottom: 5px;
		}

		.search_list {
			&_item {
				border-bottom: 0.5px solid #e7e7e7;
				line-height: 30px;
			}
		}
	}
</style>
