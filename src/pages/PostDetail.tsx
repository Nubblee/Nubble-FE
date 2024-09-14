import CommentForm from '@components/comment/commentForm'
import FloatingMenu from '@components/FloatingMenu'
import styled from '@emotion/styled'

const PostDetail: React.FC = () => {
	return (
		<Container>
			<FloatingMenu />
			<Wrapper>
				<h1>글 상세내용 페이지</h1>
				<CommentForm />
			</Wrapper>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
`

export default PostDetail
