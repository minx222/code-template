/**
 * 用户实体类型定义
 */
export interface CaUser {
	/**
	 * 用户唯一标识符
	 */
	id?: number;

	/**
	 * 用户编码
	 */
	code: string;

	/**
	 * 用户名
	 */
	username: string;

	/**
	 * 昵称
	 */
	nickname: string;

	/**
	 * 真实姓名
	 */
	realname: string;

	/**
	 * 出生日期
	 */
	birthday?: Date;

	/**
	 * 登录密码
	 */
	password: string;

	/**
	 * 手机号码
	 */
	mobilePhone: string;

	/**
	 * 加密后的手机号码
	 */
	maxMobilePhone: string;

	/**
	 * 座机号码
	 */
	phone?: string;

	/**
	 * 传真号码
	 */
	fax?: string;

	/**
	 * 国籍
	 */
	nation?: string;

	/**
	 * 家庭或工作地址
	 */
	address?: string;

	/**
	 * 关联的应用程序标识
	 */
	applicationId?: number;

	/**
	 * 助记简码
	 */
	mnemonicCode?: string;
}
