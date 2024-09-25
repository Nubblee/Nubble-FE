import React, { useState, useEffect } from 'react'
import ThreeLoading from '../components/ThreeLoading' // ThreeLoading 컴포넌트를 임포트

const LoadingPage = () => {
	const [loading, setLoading] = useState(true)

	return (
		<div>
			{loading ? (
				<ThreeLoading /> // 로딩 중일 때 ThreeLoading 컴포넌트를 렌더링
			) : (
				<h1>페이지 로드 완료!</h1> // 로딩이 끝나면 메시지 출력
			)}
		</div>
	)
}

export default LoadingPage
