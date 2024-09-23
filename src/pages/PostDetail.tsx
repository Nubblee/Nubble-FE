import CommentForm from '@components/comment/CommentForm'
import CommentList from '@components/comment/CommentList'
import FloatingMenu from '@components/FloatingMenu'
import styled from '@emotion/styled'

const PostDetail = () => {
	return (
		<Container>
			<FloatingMenu />
			<Wrapper>
				<h1>글 상세내용 페이지</h1>
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

export default PostDetail
