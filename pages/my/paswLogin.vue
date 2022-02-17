<template>
	<view class="wrapper">
		<view class="title">欢迎回来！</view>
		<view class="input">
			<text class="input_text">账号</text>
			<u-input placeholder="请输入账号" :border="false" v-model="phone" style="margin-top: 5px;"
				placeholderStyle="color: #606166"></u-input>
		</view>
		<view class="input">
			<text class="input_text">密码</text>
			<u-input placeholder="请输入密码" :border="false" :password="true" v-model="password" style="margin-top: 5px;"
				placeholderStyle="color: #606166"></u-input>
		</view>
		<view style="width: 650rpx;margin: 0 auto;margin-top: 40px;">
			<u-button type="error" shape="circle" color=" #f00000" @click="submit">登陆</u-button>
			<view style="color: #007AFF;font-size: 13px;text-align: center;width: 100%;margin-top: 20px;">忘记密码？</view>
		</view>
		<text style="position: absolute;bottom: 25px;text-align: center;width: 100%;font-size: 15px;">还没账号？<text
				style="color: #007AFF;">马上注册</text></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: ''
			};
		},
		methods: {
			async submit() {
				if (this.phone && this.password) {
					uni.setStorageSync('takeOut_Token','qwewqeasd21321')
					uni.switchTab({
						url: './index'
					})
				} else {
					uni.showToast({
						title: '请输入正确的账号和密码',
						duration: 2000,
						icon: "none"
					});
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;

		.title {
			font-size: 26px;
			color: #555555;
			margin-top: 50px;
			margin-left: 25px;
			margin-bottom: 50px;
		}

		.input {
			width: 580rpx;
			margin: 20px auto;
			background-color: #f7f7f7;
			padding: 10px;
			border-radius: 5px;

			&_text {
				color: #606166;
				font-size: 15px;
			}
		}
	}
</style>
