import { ProForm, ProFormText } from '@ant-design/pro-components'
import { FC } from 'react'

import styled from 'styled-components'

import type { UserInfoModel } from '@/stores'

const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	background-color: azure;
	.login-form-container {
		width: 400px;
		padding: 32px;
		background-color: white;
		border-radius: 8px;
	}
`
const LoginPage: FC = () => {
	const handleSubmit = async (value: UserInfoModel) => {
		console.log(value)
	}

	return (
		<LoginContainer>
			<ProForm className='login-form-container' onFinish={handleSubmit}>
				<ProFormText name='username' placeholder='请输入用户名' label='用户名' />
				<ProFormText label='密码' />
			</ProForm>
		</LoginContainer>
	)
}

export default LoginPage
