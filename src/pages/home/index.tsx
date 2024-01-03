import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

import { add } from '@/stores/modules/user'

const Home: React.FC = () => {
	const dispatch = useDispatch()
	const clickHandler = () => {
		const action = add()
		dispatch(action)
	}
	return (
		<div>
			<Button type='primary' onClick={clickHandler}>
				Primary Button
			</Button>
		</div>
	)
}

export default Home
