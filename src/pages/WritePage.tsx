import React from 'react'
import styled from '@emotion/styled'
import colors from '@/constants/color'

const WritePage = () => {
	return (
		<Container>
			<div className="area-write">글 작성 영역</div>
			<div className="area-read">작성 내용 확인 영역</div>
		</Container>
	)
}

export default WritePage

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	.area-write {
		width: 100%;
		background-color: ${colors.mainBlack};
	}

	.area-read {
		width: 100%;
		background-color: ${colors.bgBlack};
	}
`
