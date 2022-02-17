<template>
	<view class="wrapper">
		<view>
			<u-navbar :title="option.option" :border-bottom="false"></u-navbar>
			<view class="content">
				<!-- 正文内容 -->
			</view>
		</view>
		<u-form :model="form" ref="uForm">
			<u-form-item label="地址:" label-width="110" prop="address">
				<u-input v-model="form.address" placeholder="详细地址" />
			</u-form-item>
			<u-form-item label="标签:">
				<u-tag text="家" bg-color="#fff" @click="tagClick(0)" style="margin: 0 10px;"
					:class="{isTagClickStyle:isTagClick==0}" />
				<u-tag text="公司" bg-color="#fff" @click="tagClick(1)" style="margin: 0 10px;"
					:class="{isTagClickStyle:isTagClick==1}" />
				<u-tag text="学校" bg-color="#fff" @click="tagClick(2)" style="margin: 0 10px;"
					:class="{isTagClickStyle:isTagClick==2}" />
			</u-form-item>
			<u-form-item label="联系人:" label-width="110" prop="name">
				<view style="width: 100%;display: flex;flex-direction: row;">
					<u-input v-model="form.name" placeholder="请填写收货人姓名" />
					<u-radio-group v-model="form.sex" style="margin-left: 5px;">
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name"
							:disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</view>
			</u-form-item>
			<u-form-item label="手机号:" label-width="110" prop="phone">
				<u-input v-model="form.phone" placeholder="请填写收货手机号码" />
			</u-form-item>
		</u-form>
		<u-button style="width: 80%;margin-top: 10px;" type="warning" @click="keepAddress">保存地址</u-button>
		<u-button style="width: 80%;margin-top: 10px;" type="error" @click="removeAddress">删除地址</u-button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				form: {
					address: '',
					tag: '',
					name: '',
					phone: '',
					sex: '先生'
				},
				isTagClick: 4,
				radioList: [{
						name: '先生',
						disabled: false
					},
					{
						name: '女士',
						disabled: false
					}
				],
				rules: {
					name: [{
						required: true,
						message: '请输入联系人',
						trigger: ['change', 'blur']
					}],
					address: [{
						required: true,
						message: '请输入门牌号',
						trigger: ['change', 'blur']
					}],
					phone: [{
						required: true,
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '请填写正确手机号',
						trigger: ['change', 'blur']
					}],
				},
				option: ''
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			this.option = JSON.parse(option.option)
			if (this.option.option == '编辑收货地址') {
				this.form = JSON.parse(uni.getStorageSync('address'))[this.option.index]
			}
		},
		methods: {
			tagClick(index) {
				if (this.isTagClick == index) {
					this.isTagClick = 4
					this.form.tag = ''
				} else {
					this.isTagClick = index
					this.form.tag = index
				}
			},
			removeAddress(){
				let address = uni.getStorageSync('address')
				let res = JSON.parse(address)
				res.splice(this.option.index,1)
				uni.setStorageSync('address', JSON.stringify(res))
				uni.navigateBack({
					delta: 1
				})
			},
			keepAddress() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						let address = uni.getStorageSync('address')
						if (!address) {
							let data = []
							data.push(this.form)
							uni.setStorageSync('address', JSON.stringify(data))
						} else {
							let res = JSON.parse(address)
							if (this.option.option == '编辑收货地址') {
								res[this.option.index] = this.form
								uni.setStorageSync('address', JSON.stringify(res))
							} else {
								res.unshift(this.form)
								uni.setStorageSync('address', JSON.stringify(res))
							}
						}
						uni.navigateBack({
							delta: 1
						})
					}
				});

			}
		}
	};
</script>
<style lang="scss" scoped>
	.wrapper {
		padding: 10px;

		.isTagClickStyle {
			background-color: #ffd4d6 !important;
		}
	}
</style>
