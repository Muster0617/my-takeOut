<template>
	<view>
		<u-cell-group>
				<u-cell-item icon="reload" title="退出登陆" :arrow="false" @click="logout"></u-cell-item>
			</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logout(){
				uni.removeStorageSync('takeOut_Token')
				uni.switchTab({
					url:'./index'
				})
			}
		}
	}
</script>

<style>

</style>
