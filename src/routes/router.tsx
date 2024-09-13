import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout/Layout'
import ErrorPage from '@/pages/ErrorPage'
import Home from '@/pages/Home'
import Login from '@/pages/Login'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/login',
				element: <Login />, // 로그인 페이지 (헤더 없음)
			},
		],
	},
])
