import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout/Layout'
import ErrorPage from '@/pages/ErrorPage'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import PostDetail from '@/pages/PostDetail'
import Saves from '@/pages/Saves'
import WritePage from '@/pages/WritePage'

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
			{ path: '/postDetail', element: <PostDetail /> },
			{
				path: '/saves',
				element: <Saves />,
			},
			{
				path: '/write',
				element: <WritePage />, // 로그인 페이지 (헤더 없음)
			},
		],
	},
])
