import { ProForm, ProFormText } from '@ant-design/pro-components'
import { FC } from 'react'

import type { UserInfoModel } from '@/stores'

import './index.less'

const LoginPage: FC = () => {
	const handleSubmit = async (value: UserInfoModel) => {
		console.log(value)
	}

	return (
		<div className='login-container'>
			<ProForm className='login-form-container' onFinish={handleSubmit}>
				<ProFormText name='username' placeholder='请输入用户名' label='用户名' />
				<ProFormText label='密码' />
			</ProForm>
		</div>
	)
}

export default LoginPage
