import GlobalStyles from './styles/GlobalStyles'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

const App = () => {
	return (
		<div>
			<GlobalStyles />
			<RouterProvider router={router} />
			<p>App</p>
		</div>
	)
}

export default App
