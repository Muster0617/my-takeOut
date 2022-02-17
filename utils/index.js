export function deepClone(obj) {
	let newObj = obj instanceof Array ? [] : {}
	for (const key in obj) {
		newObj[key] = typeof obj[key] == 'object' ? deepClone(obj[key]) : obj[key]
	}
	return newObj
}

export function debounce(func, delay) {
	let timer = null
	return function() {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this)
		}, delay)
	}
}
