<template>
	<view class="wrapper">
		<view class="top">
			<view class="size">
				<u-icon name="map"></u-icon>
				{{size?size:"请选择你的位置"}}
			</view>
			<view class="search" @click="goSearch">
				<u-search :show-action="false" :clearabled="true" ></u-search>
			</view>
		</view>
		<view class="main">
			<swiper class="swiper" @change="change">
				<swiper-item>
					<u-grid :col="5" :border="false">
						<u-grid-item v-for="(item, index) in lable[0]" :index="index" :key="index">
							<u-icon :name="item.img" :size="65"></u-icon>
							<text class="grid-text">{{ item.title }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item>
					<u-grid :col="5" :border="false">
						<u-grid-item v-for="(item, index) in lable[1]" :index="index + 10" :key="index">
							<u-icon :name="item.img" :size="65"></u-icon>
							<text class="grid-text">{{item.title }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
			</swiper>
			<view class="indicator-dots" v-if="isSwiper">
				<view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
				</view>
				<view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
				</view>
			</view>
		</view>
		<view class="buttom">
			<view class="select">
				<text class="selectTitle">为你优选</text>
				<scroll-view scroll-x="true" class="scroll">
					<view class="scrollView" v-for="(item,index) in optimizationData" :key="index">
						<view class="scrollItem">
							<image :src="item.image"></image>
							<text class="scrollTitle">{{item.title}}</text>
							<text class="scrollLable">{{item.lable}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="nearbyShops">
				<text class="nearbyTitle">附近商家</text>
				<view class="nearbySelect">
					<u-dropdown title-size="15px" @close="close" border-radius="30" ref="uDropdown">
						<u-dropdown-item v-model="value" title="综合排序" :options="options" @change="sortChange">
						</u-dropdown-item>
						<u-dropdown-item title="速度"></u-dropdown-item>
						<u-dropdown-item title="筛选">
							<view class="slot-content">
								<view class="dropdown_feature">
									<text>商家特色</text>
									<u-checkbox-group
										style="margin-top: 8px;display: flex;justify-content: space-around;">
										<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList"
											:key="index" :name="item.name">{{item.name}}</u-checkbox>
									</u-checkbox-group>

								</view>
								<view class="dropdown_capita">
									<text>人均价</text>
									<u-radio-group v-model="radioValue" @change="radioGroupChange"
										style="margin-top: 8px;display: flex;justify-content: space-around;">
										<u-radio name="20元以下">
											20元以下
										</u-radio>
										<u-radio name="20-40元">
											20-40元
										</u-radio>
										<u-radio name="40元以上">
											40元以上
										</u-radio>
									</u-radio-group>

								</view>
								<view class="dropdown_button">
									<u-button @click="clearDropdown" style="width: 45%;">清空</u-button>
									<u-button type="primary" @click="confirmDropdown"
										style="width: 45%;background-color: #FFD01E;color: #000000;">确定</u-button>
								</view>

							</view>
						</u-dropdown-item>
					</u-dropdown>
				</view>
				<view class="nearbyList">
					<nearbyItem :nearbyshopData="nearbyshopData"/>
					<view style="text-align: center;margin-top: 10px;" v-if="nearbyshopData.length==0">
						没有相关商品
					</view>
				</view>

			</view>

		</view>

	</view>
</template>

<script>
	import {
		getOptimization,
		getNearbyshops
	} from '../../api/index.js'
	import {
		deepClone
	} from '../../utils/index.js'
	import nearbyItem from'../../component/nearbyItem.vue'
	export default {
		components:{
			nearbyItem
		},
		data() {
			return {
				size: '',
				isSwiper: true,
				current: 0,
				// 轮播数组
				lable: [
					[{
							'img': require('../../static/inster/meishi.png'),
							'title': '美食'
						},
						{
							'img': require('../../static/inster/chaoshi.png'),
							'title': '超市便利'
						},
						{
							'img': require('../../static/inster/shuiguo.png'),
							'title': '蔬菜水果'
						},
						{
							'img': require('../../static/inster/meituan.png'),
							'title': '美团专送'
						},
						{
							'img': require('../../static/inster/paotui.png'),
							'title': '跑腿代购'
						},
						{
							'img': require('../../static/inster/yexiao.png'),
							'title': '夜宵'
						},
						{
							'img': require('../../static/inster/jintie.png'),
							'title': '津贴联盟'
						},
						{
							'img': require('../../static/inster/pinping.png'),
							'title': '甜点饮品'
						},
						{
							'img': require('../../static/inster/shaokao.png'),
							'title': '龙虾烧烤'
						},
						{
							'img': require('../../static/inster/dangao.png'),
							'title': '甜蜜蛋糕'
						}
					],
					[{
							'img': require('../../static/inster/hanbao.png'),
							'title': '汉堡披萨'
						},
						{
							'img': require('../../static/inster/liaoli.png'),
							'title': '日韩料理'
						},
						{
							'img': require('../../static/inster/malatang.png'),
							'title': '麻辣烫'
						},
						{
							'img': require('../../static/inster/kuaican.png'),
							'title': '快食简餐'
						},
						{
							'img': require('../../static/inster/xianhua.png'),
							'title': '浪漫鲜花'
						},
						{
							'img': require('../../static/inster/lazi.png'),
							'title': '无辣不欢'
						},
						{
							'img': require('../../static/inster/jiaozi.png'),
							'title': '饺子馆'
						},
						{
							'img': require('../../static/inster/xiaochi.png'),
							'title': '小吃馆'
						},
						{
							'img': require('../../static/inster/baofan.png'),
							'title': '煲仔饭'
						},
						{
							'img': require('../../static/inster/qita.png'),
							'title': '其他'
						}
					]
				],
				optimizationData: '',
				nearbyshopData: [],
				value: 1,
				options: [{
						label: '综合排序',
						value: 1,
					},
					{
						label: '起送价最低',
						value: 2,
					},
					{
						label: '配送费最低',
						value: 3,
					},
					{
						label: '人均高到低',
						value: 4,
					},
					{
						label: '人均低到高',
						value: 5,
					}
				],
				checkboxList: [{
						name: '配送最快',
						checked: false,
					},
					{
						name: '0元起送',
						checked: false,
					},
					{
						name: '免配送费',
						checked: false,
					}
				],
				radioValue: '',
				cloneData: ''

			}
		},
		onLoad() {
			this.getOptimizationData()
			this.getNearbyshopData()
		},
		methods: {
			async getOptimizationData() {
				const res = await getOptimization()
				this.optimizationData = res.data
			},
			async getNearbyshopData() {
				const res = await getNearbyshops()
				this.nearbyshopData = res.data
			},
			goSearch(){
				uni.navigateTo({
					url:'./search'
				})
			},
			radioGroupChange(e) {
				console.log(e);
			},
			change(e) {
				this.current = e.detail.current;
			},
			close() {
				this.clearDropdown()
			},
			clearDropdown() {
				this.radioValue = ''
				this.checkboxList.forEach(row => {
					row.checked = false
				})
			},
			confirmDropdown() {
				if (!this.cloneData) {
					this.cloneData = deepClone(this.nearbyshopData)
				}
				let checkbox = []
				this.checkboxList.forEach(row => {
					if (row.checked) {
						checkbox.push(row.name)
					}
				})
				if (this.radioValue) {
					let data = this.cloneData.filter(row => {
						if (this.radioValue == '20元以下') {
							return row.capita <= 20
						}
						if (this.radioValue == '20-40元') {
							return row.capita >= 20 && row.capita < 40
						}
						if (this.radioValue == '40元以上') {
							return row.capita >= 40
						}
					})
					if (checkbox.length > 0) {
						if (checkbox.indexOf('0元起送') !== -1) {
							data = data.filter(row => {
								return row.delivering == 0
							})
						}
						if (checkbox.indexOf('免配送费') !== -1) {
							data = data.filter(row => {
								return row.physical == 0
							})
							console.log(data)
						}
					}
					if (data.length > 0) {
						this.nearbyshopData = data
					} else {
						uni.showToast({
							title: '未搜索到相关商品',
							duration: 2000,
							icon: 'error'
						});
					}
				}
				if (checkbox.length > 0 && !this.radioValue) {
					let data = deepClone(this.cloneData)
					if (checkbox.indexOf('0元起送') !== -1) {
						data = data.filter(row => {
							return row.delivering == 0
						})
					}
					if (checkbox.indexOf('免配送费') !== -1) {
						data = data.filter(row => {
							return row.physical == 0
						})
					}
					if (data.length > 0) {
						this.nearbyshopData = data
					} else {
						uni.showToast({
							title: '没有相关商品',
							duration: 2000,
							icon: 'error'
						});
					}
				}
				if (checkbox.length == 0 && !this.radioValue) {
					this.nearbyshopData = this.cloneData
				}

				this.$refs.uDropdown.close();
			},
			sortChange() {
				if (this.cloneData) {
					this.nearbyshopData = this.cloneData
				}
				if (this.value == 1) {
					this.getNearbyshopData()
				}
				if (this.value == 2) {
					this.nearbyshopData.sort((a, b) => {
						return a.delivering - b.delivering
					})
				}
				if (this.value == 3) {
					this.nearbyshopData.sort((a, b) => {
						return a.physical - b.physical
					})
				}
				if (this.value == 4) {
					this.nearbyshopData.sort((a, b) => {
						return b.capita - a.capita
					})
				}
				if (this.value == 5) {
					this.nearbyshopData.sort((a, b) => {
						return a.capita - b.capita
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		height: 100%;

		.top {
			.size {
				font-size: 16px;
				font-weight: bolder;
				padding: 10rpx;
			}

			.search {
				padding: 10rpx;
			}

		}

		.main {
			.grid-text {
				font-size: 28rpx;
				margin-top: 4rpx;
				color: $u-type-info;
			}

			.swiper {
				height: 300rpx;
			}

			.indicator-dots {
				margin-top: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.indicator-dots-item {
				background-color: $u-tips-color;
				height: 6px;
				width: 6px;
				border-radius: 10px;
				margin: 0 3px;
			}

			.indicator-dots-active {
				background-color: $u-type-primary;
			}
		}

		.buttom {
			.select {
				.selectTitle {
					font-size: 16px;
					font-weight: bolder;
					margin-left: 10upx;
					line-height: 30px;
				}

				.scroll {
					white-space: nowrap;
					width: 100%;
				}

				.scrollView {
					display: inline-block;
					width: 250rpx;
					height: 300rpx;
					margin: 5rpx;

					.scrollItem {
						display: flex;
						flex-direction: column;
						align-content: center;
						justify-content: center;
						text-align: center;

						.scrollTitle {
							font-size: 16px;
						}

						.scrollLable {
							font-size: 13px;
							color: rgb(153, 153, 153);
						}

						image {
							width: 250upx;
							height: 200rpx;
						}
					}
				}
			}

			.nearbyShops {
				.nearbyTitle {
					font-size: 16px;
					font-weight: bolder;
					margin-left: 10upx;
					line-height: 30px;
				}

				.nearbySelect {
					width: 100%;

					/deep/.u-dropdown__content {
						height: 100vh !important;
					}

					.slot-content {
						height: 250px;
						background-color: #ffffff;

						.dropdown_feature,
						.dropdown_capita {
							display: flex;
							flex-direction: column;
							align-content: space-around;
							padding: 10px;
							font-size: 16px;
						}

						.dropdown_button {
							display: flex;
							flex-direction: row;
							margin-top: 30px;

						}

					}
				}

				.nearbyList {}
			}

		}


	}
</style>
