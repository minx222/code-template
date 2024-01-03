import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { Provider } from 'react-redux'

import AppRouter from '@/router'
import { stores } from '@/stores'

const App: React.FC = () => (
	<ConfigProvider locale={zhCN}>
		<Provider store={stores}>
			<AppRouter />
		</Provider>
	</ConfigProvider>
)

export default App
