import colors from '@/constants/color'
import { fontSize } from '@/constants/font'
import CommentForm from '@components/comment/CommentForm'
import CommentList from '@components/comment/CommentList'
import FloatingMenu from '@components/FloatingMenu'
import styled from '@emotion/styled'

const postData = {
	title: '거대언어모델 로봇 ML 모델의 경량화 1부: 훈련 후 양자화',
	author: '손성오',
	date: '2024년 9월 12일',
	content: `오늘날 머신러닝(machine learning, ML) 모델 개발은 대부분 NVIDIA의 데이터센터 GPU(A100)나 워크스테이션 GPU(예: RTX4090)가 장착된 고성능 서버 환경에서 이루어진다. 우아한 체험으로 로봇러ABO에서...오늘날 머신러닝(machine learning, ML) 모델 개발은 대부분 NVIDIA의 데이터센터 GPU(A100)나 워크스테이션 GPU(예: RTX4090)가 장착된 고성능 서버 환경에서 이루어진다. 우아한 체험으로 로봇러ABO에서...오늘날 머신러닝(machine learning, ML) 모델 개발은 대부분 NVIDIA의 데이터센터 GPU(A100)나 워크스테이션 GPU(예: RTX4090)가 장착된 고성능 서버 환경에서 이루어진다. 우아한 체험으로 로봇러ABO에서...오늘날 머신러닝(machine learning, ML) 모델 개발은 대부분 NVIDIA의 데이터센터 GPU(A100)나 워크스테이션 GPU(예: RTX4090)가 장착된 고성능 서버 환경에서 이루어진다. 우아한 체험으로 로봇러ABO에서...오늘날 머신러닝(machine learning, ML) 모델 개발은 대부분 NVIDIA의 데이터센터 GPU(A100)나 워크스테이션 GPU(예: RTX4090)가 장착된 고성능 서버 환경에서 이루어진다. 우아한 체험으로 로봇러ABO에서...오늘날 머신러닝(machine learning, ML) 모델 개발은 대부분 NVIDIA의 데이터센터 GPU(A100)나 워크스테이션 GPU(예: RTX4090)가 장착된 고성능 서버 환경에서 이루어진다. 우아한 체험으로 로봇러ABO에서...`,
}

const PostDetail = () => {
	return (
		<Container>
			<FloatingMenu />
			<Wrapper>
				<TitleContainer>
					<div>
						<Title>{postData.title}</Title>
						<MetaData>
							<DateName>
								<span>{postData.date}</span>
								<span>{postData.author}</span>
							</DateName>
							<EditDelete>
								<button>수정</button>
								<button>삭제</button>
							</EditDelete>
						</MetaData>
					</div>
				</TitleContainer>
				<Content>{postData.content}</Content>
				<CommentForm />
				<CommentList />
			</Wrapper>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	max-width: 780px;
	margin: 20px auto;
	width: 100%;
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const DateName = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`

const Title = styled.h1`
	word-break: keep-all;
	overflow-wrap: break-word;
`

const MetaData = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;

	span:last-of-type {
		font-size: ${fontSize.xl};
	}
`

const EditDelete = styled.div`
	display: flex;
	gap: 5px;

	button {
		background: none;
		border: none;
		color: ${colors.commentGray};
		cursor: pointer;

		&:hover {
			text-decoration: underline;
		}
	}
`

const Content = styled.div`
	width: 100%;
	margin-bottom: 50px;
	border-bottom: 1px solid ${colors.commentBlack};
	padding-bottom: 30px;
	line-height: 1.8;
`

export default PostDetail
