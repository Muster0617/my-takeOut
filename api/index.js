import request from '../utils/request.js'

export function getOptimization(){
	return request({
		url:'/forshop/getprefer',
		method:'GET',
	})
}
export function getNearbyshops(){
	return request({
		url:'/forshop/wxshop',
		method:'GET',
	})
}
