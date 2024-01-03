/**
 * @name 深克隆
 * @param object 源数据
 * @returns 		 克隆后的数据
 */
export const deepCopy = <T>(object: T): T => {
	// 判断是否需要深拷贝
	if (!object || typeof object !== 'object') {
		return object
	}

	let result: any

	// 判断是否是数组
	if (Array.isArray(object)) {
		result = [] as any[]
		for (let i = 0; i < object.length; i++) {
			const temp = deepCopy(object[i])
			result.push(temp)
		}
	} else {
		result = {} as any
		for (const key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				result[key] = deepCopy(object[key])
			}
		}
	}

	return result as T
}
