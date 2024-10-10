export const login = {
	label: {
		username: '用户名',
		password: '密码',
		phone: '手机号'
	},
	rules: {
		phone: {
			null: '请输入手机号',
			valid: '请输入有效的手机号'
		},
		username: {
			null: '请输入用户名',
			length: '用户名长度应在 3 到 15 个字符之间'
		},
		password: {
			null: '请输入密码',
			length: '密码长度应在 6 到 20 个字符之间',
			valid: '密码必须包含至少一个数字和一个字母'
		}
	}
}
