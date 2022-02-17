export default function({
	url,
	data,
	method,
	header
}) {
	return new Promise((resole, reject) =>{
		uni.request({
			url: 'https://meituan.thexxdd.cn/api' + arguments[0].url,
			method: arguments[0].method,
			data: arguments[0].data,
			header:arguments[0].header||{},
			success(res) {
				resole(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})

}
