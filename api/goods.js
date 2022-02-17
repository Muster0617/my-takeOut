const BaseUrl='https://meituan.thexxdd.cn/api'
import request from '../utils/request.js'

export function getShopInfo(data){
	return request({
		url:'/forshop/shop',
		method:'POST',
		data:data,
	})
}
export function getDishes(data){
	return request({
		url:'/forshop/getdishes',
		method:'POST',
		data:data,
	})
}
export function getDiscuss(data){
	return request({
		url:'/message/discuss',
		method:'POST',
		data:data,
	})
}