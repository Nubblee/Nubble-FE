import GlobalStyles from './styles/GlobalStyles'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

const App = () => {
	return (
		<div>
			<GlobalStyles />
			<RouterProvider router={router} />
		</div>
	)
}

export default App
