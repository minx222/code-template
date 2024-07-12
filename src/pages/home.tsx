import { Button } from 'antd';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';

import { add } from '@/stores/modules/user';

const Home: FC = () => {
	const dispatch = useDispatch();
	const a = '';
	const clickHandler = () => {
		const action = add();
		dispatch(action);
	};
	return (
		<div className="flex">
			<Button type="primary" onClick={clickHandler}>
				Primary Button
			</Button>
		</div>
	);
};

export default Home;
