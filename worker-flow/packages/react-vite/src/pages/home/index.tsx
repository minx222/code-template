import { useAppSelector } from '@/stores'
import { Button } from 'antd'
const Home = () => {
    const navigate = useNavigate()

    const count = useAppSelector(state => state.counter.count)

	const backHome = () => {
        navigate('/about')
    }

	return (
		<div className="flex flex-col gap-3 items-center justify-center w-full h-full">
			<div>当前count的值{count}</div>
			<div>
				<Button onClick={backHome}>about页面</Button>
			</div>
		</div>
	)
}

export default Home
