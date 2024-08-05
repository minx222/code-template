
import { rimraf } from 'rimraf'

/**
 * @name 删除文件夹
 * @param {string} path 路径
 */
export const rmrf = (path) => {
	return rimraf(path)
}
