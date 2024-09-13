import { Outlet, useLocation } from 'react-router-dom'

const Layout: React.FC = () => {
	const location = useLocation()

	// 헤더가 없는 경로 리스트 (예: 로그인, 회원가입 페이지)
	const noHeaderRoutes = ['/login']

	// 현재 경로가 noHeaderRoutes에 포함되는지 확인
	const hideHeader = noHeaderRoutes.includes(location.pathname)

	return (
		<div>
			{!hideHeader && <header>Header</header>} {/* 조건에 따라 헤더 표시 */}
			<main>
				<Outlet /> {/* 중첩된 라우트 렌더링 */}
			</main>
		</div>
	)
}

export default Layout
