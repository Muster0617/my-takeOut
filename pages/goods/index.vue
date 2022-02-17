<template>
	<view class="wrapper">
		<view class="top">
			<image :src="shopInfoData.logo" mode="" style="width: 66px;height: 66px;margin-left: 5rpx;"></image>
			<view class="top_info">
				<text class="top_info_shop">{{shopInfoData.shop}}</text>
				<view>
					<u-icon name="bag"></u-icon>
					<text class="top_info_duration">配送约{{shopInfoData.duration}}分钟</text>
				</view>
			</view>
		</view>
		<u-tabs :list="list" :is-scroll="false" :current="current" bar-width="80" active-color="#424242"
			font-size="33rpx" @change="change" style="width: 200px;margin-top: 5px;margin-bottom: 5px;">
		</u-tabs>
		<view class="main_commodity" v-if="current==0">
			<view class="main_left">
				<text v-for="(item,index) in optiData" :class="{clickStyle:index==clickIndex}" :key="index"
					@click.stop="selectType(index)">{{item.type}}</text>
			</view>
			<view class="main_right">
				<scroll-view scroll-y="true" style="height: 58vh;" @scroll="scroll" :scroll-top="scrollTo">
					<view class="food_item" v-for="(item,indexs) in foodData" :key="indexs" style="margin-left: 10px;">
						<text style="font-size: 16px;font-weight: bolder;">{{item.type}}</text>
						<view v-for="(value,index) in item.foods" :key="index"
							style="margin-bottom: 10px;margin-top: 10px;display: flex;flex-direction: row;">
							<image :src="value.image" mode="" style="width: 100px;height: 100px;"></image>
							<view
								style="width: calc(100% - 100px); margin-left: 10px;display: flex;flex-direction: column;justify-content: space-between;">
								<text style="font-size: 18px;font-weight: bolder;">{{value.input}}</text>
								<view>
									<u-tag :text="tag" type="info" border-color="#ffffff"
										v-for="(tag,num) in value.tags" :key="num" />
								</view>
								<text style="font-size: 12px;color: #898989;">月售{{value.Price*10*value.Discount}}</text>
								<view
									style=" display: flex;flex-direction: row;justify-content: space-around;align-items: center;">
									<text style="color: #fb4e44;font-size: 16px;">¥ {{value.Discount}}</text>
									<text
										style="text-decoration:line-through;font-size: 12px;color: #898989;">¥{{value.Price}}</text>
									<u-number-box v-model="shoppingCart[value.input]" @change="numChange"
										inputWidth="30"></u-number-box>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="bottom">
				<image :src="closeImage" mode=""
					style="width: 60px;height: 88px;position: relative;bottom: 15px;margin-left: 10px;">
				</image>
				<view v-show="price>0"
					style="position: absolute;width: 24px;height: 24px;background-color: #dc0000;border-radius: 20px;color: #FFFFFF;font-weight: bolder;text-align: center;line-height: 24px;font-size: 15px;top: 27rpx;left: 95rpx;">
					<text>{{sum}}</text>
				</view>
				<view class="bottom_info">
					<text style="color: #FFFFFF;font-size: 19px;position: relative;top: 10rpx;">￥{{price}}</text>
					<text
						style="color: #C0C0C0;font-size: 13px;position: relative;bottom: 10rpx;">另需配送费{{shopInfoData.physical}}元</text>

				</view>
				<view v-show="price!=0" :class="{isCloseStyle:isClose,bottom_buttom:true}" @click="goClose">
					{{close}}
				</view>
			</view>
		</view>
		<view class="main_evaluate" v-if="current==1">
			<scroll-view scroll-y="true" style="height: calc(100vh - 170px);">
				<u-tag :text="tag.mes+tag.num" type="info" border-color="#ffffff" v-for="(tag,index) in classmessage"
					:key="index" style="margin: 5rpx;" />
				<view class="">
					<view v-for="(item,index) in evaluateData" :key="index"
						style="margin: 0 auto; width: 95%; padding: 5px; border-bottom: 1px solid #dedede;">
						<view style="display: flex;flex-direction: row;">
							<u-avatar :src="item.messagedata.avatarUrl"></u-avatar>
							<view
								style="margin-left: 10px; display: flex;flex-direction: column;justify-content: space-around;">
								<text>{{item.messagedata.nickName}}</text>
								<text style="font-size: 13px;color: #afafaf;">{{item.messagedata.time}}</text>
							</view>
						</view>
						<view style="margin-top: 5px;">
							<text style="line-height: 25px;">{{item.messagedata.usermess}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="main_shopInfo" v-if="current==2"
			style="font-size: 18px;line-height: 40px;padding: 5px; margin-top: 5px;">
			<view style="border-bottom: 1px solid #e3e3e3;margin-bottom: 5px;">
				<u-icon name="map" style="margin-left: 5px;"></u-icon>
				<text style="margin-left: 5px;">{{shopInfoData.address}}</text>
			</view>
			<view style="border-bottom: 1px solid #e3e3e3;margin-bottom: 5px;">
				<u-icon name="list" style="margin-left: 5px;"></u-icon>
				<text style="margin-left: 5px;">查看食品安全档案</text>
			</view>
			<view style="border-bottom: 1px solid #e3e3e3;margin-bottom: 5px;">
				<u-icon name="clock" style="margin-left: 5px;"></u-icon>
				<text style="margin-left: 5px;">配送时间：{{shopInfoData.times}}</text>
			</view>
			<view style="border-bottom: 1px solid #e3e3e3;margin-bottom: 5px;">
				<u-icon name="calendar" style="margin-left: 5px;"></u-icon>
				<text style="margin-left: 5px;">商家服务到店自取</text>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		getShopInfo,
		getDishes,
		getDiscuss
	} from '../../api/goods.js'
	export default {
		data() {
			return {
				shopInfoData: {},
				openid: '',
				list: [{
						name: '点菜'
					},
					{
						name: '评价'
					},
					{
						name: '商家'
					}
				],
				current: 0,
				dishesData: [],
				optiData: [],
				foodData: [],
				number: 0,
				evaluateData: [],
				classmessage: [],
				shoppingCart: {},
				price: 0,
				close: '',
				isClose: false,
				closeImage: '../../static/goods/weigou.png',
				sum: 0,
				scrollFood: [],
				scrollTo: 0,
				clickIndex: 0,
				isScroll: false

			}
		},
		onLoad(option) {
			this.openid = option.openid
			this.getShopInfoData()
			this.getDishesData()
			this.getEvaluateData()
		},
		mounted() {
			this.getScrollFood()
		},
		methods: {
			async getShopInfoData() {
				const res = await getShopInfo({
					openid: this.openid
				})
				this.shopInfoData = res.data[0]
			},
			async getEvaluateData() {
				const res = await getDiscuss({
					merchantid: this.openid
				})
				this.evaluateData = res.data
				let counter = {}
				this.evaluateData.forEach(row => {
					if (row.classmessage) {
						counter[row.classmessage] ? counter[row.classmessage] += 1 : counter[row
							.classmessage] = 1
					}
				})
				for (const key in counter) {
					this.classmessage.push({
						mes: key,
						num: counter[key]
					})
				}
				this.classmessage.sort((a, b) => {
					return b.num - a.num
				})

			},
			async getDishesData() {
				const res = await getDishes({
					openid: this.openid
				})
				this.dishesData = res.data
				let tyepes = []
				let food = []
				this.dishesData.forEach(row => {
					if (tyepes.indexOf(row.optidata) == -1) {
						tyepes.push(row.optidata)
						this.optiData.push({
							type: row.optidata,
						})
						food.push({
							type: row.optidata,
							foods: []
						})
					}
				})
				this.dishesData.forEach(row => {
					let index = tyepes.indexOf(row.optidata)
					food[index].foods.push(row.objdis)
				})
				this.foodData = food
				food.forEach((row, index) => {
					row.foods.forEach(val => {
						this.shoppingCart[val.input] = 0
					})
				})
			},
			getScrollFood() {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.food_item').boundingClientRect(datas => {
					if (!datas.length) {
						setTimeout(() => {
							this.getScrollFood()
						}, 10)
					} else {
						datas.forEach(row => {
							this.scrollFood.push(parseInt(row.top - datas[0].top))
						})
					}

				}).exec();
			},
			numChange() {
				let price = 0
				let sum = 0
				for (const key in this.shoppingCart) {
					sum += this.shoppingCart[key]
					for (let type of this.foodData) {
						for (let food of type['foods']) {
							if (food.input == key) {
								price += food.Discount * this.shoppingCart[key]
								continue
							}
						}
					}
				}
				this.sum = sum
				this.price = Math.floor(price * 10) / 10
				if (this.shopInfoData.delivering - this.price > 0) {
					this.close = `还差${ (this.shopInfoData.delivering-this.price).toFixed(1)}元`
					this.isClose = false
					this.closeImage = '../../static/goods/weigou.png'
				} else {
					this.close = '去结算'
					this.isClose = true
					this.closeImage = '../../static/goods/yigou.png'
				}

			},
			selectType(val) {
				this.clickIndex = val
				this.scrollTo = this.scrollFood[val]
			},
			scroll(e) {
				for (let val of this.scrollFood) {
					let index = this.scrollFood.indexOf(val)
					if ( !this.scrollFood[index + 1]|| parseInt(e.detail.scrollTop) + 1 >= this.scrollFood[index] && parseInt(e.detail.scrollTop) + 1 <
						this.scrollFood[index + 1]) {
						this.selectType(index)
						break
					}
				}
			},
			goClose() {
				if (this.close == '去结算') {
					let payList = {
						list: [],
						price: '',
						num: 0,
						postage: 0,
						shop:'',
						logo:'',
						openid:''
					}
					for (const key in this.shoppingCart) {
						if (this.shoppingCart[key] !== 0) {
							payList['list'].push({
								food: key,
								counter: this.shoppingCart[key]
							})
							payList['num'] += this.shoppingCart[key]
						}
					}
					payList.price = this.price
					payList.openid = this.openid
					payList.postage = this.shopInfoData.physical
					payList.shop = this.shopInfoData.shop
					payList.logo = this.shopInfoData.logo
					for (let list of payList.list) {
						for (let type of this.foodData) {
							for (let food of type.foods) {
								if (food.input == list.food) {
									this.$set(list, 'unit', food.Discount)
									this.$set(list, 'image', food.image)
								}
							}
						}
					}
					uni.navigateTo({
						url: `./pay?payList=${JSON.stringify(payList)}`
					})
				}
			},
			change(index) {
				this.current = index;
			}

		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		height: 100%;

		.top {
			display: flex;
			flex-direction: row;


			.top_info {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-left: 10px;

				.top_info_shop {
					font-size: 20px;
				}

				.top_info_duration {
					display: inline-block;
				}
			}
		}

		/deep/.u-tab-bar {
			background-color: #ffff00 !important;
		}

		.main_commodity {
			display: flex;
			flex-direction: row;
			width: 100%;

			.main_left {
				height: 58vh;
				width: 25%;
				background-color: #ffffff;

				.clickStyle {
					color: #000000;
					background-color: #f4f4f4;
				}

				text {
					width: 100%;
					display: inline-block;
					text-align: center;
					height: 44px;
					line-height: 44px;
					color: #a8a8a8;
				}
			}

			.main_right {
				height: 58vh;
				width: 100%;
			}

			.bottom {
				position: fixed;
				bottom: 20px;
				width: 80%;
				height: 82px;
				display: flex;
				flex-direction: row;
				background-color: #333333;
				border-radius: 13px;
				left: 10%;

				.bottom_info {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left: 10px;
				}

				.bottom_buttom {
					margin-left: auto;
					color: #FFFFFF;
					font-size: 22px;
					line-height: 82px;
					text-align: center;
					width: 40%;
					border-top-right-radius: 13px;
					border-bottom-right-radius: 13px;
				}

				.isCloseStyle {
					background: linear-gradient(to top, #ffe566 10%, #ffd300 100%);
				}
			}
		}



	}
</style>
