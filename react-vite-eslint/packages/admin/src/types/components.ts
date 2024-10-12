export interface Component {
	/**
	 * 唯一id
	 */
	id?: number; // 使用可选属性表示可能在某些场景下ID不存在

	/**
	 * 组件名称
	 */
	name: string;

	/**
	 * 组件编码
	 */
	code: string;

	/**
	 * 组件类型
	 */
	category: number;

	/**
	 * 组件文件url
	 */
	url: string;

	/**
	 * 组件状态
	 */
	status: 1 | 2;

	/**
	 * 组件封面
	 */
	cover: string;

	/**
	 * 组件图标
	 */
	icon: string;
}
