import colors from '@/constants/color'
import Button from '@components/Button'
import styled from '@emotion/styled'

const CommentForm = () => {
	return (
		<Form>
			<InputZone>
				<Input placeholder="닉네임" />
				<Input placeholder="비밀번호" />
			</InputZone>
			<Textarea placeholder="댓글을 작성하세요" />
			<ButtonWrapper>
				<Button>등록하기</Button>
			</ButtonWrapper>
		</Form>
	)
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`
const InputZone = styled.div`
	display: flex;
	gap: 12px;
`

const Input = styled.input`
	padding: 6px 10px;
	border-radius: 5px;
	border: 1px solid ${colors.bgBlack};
	background-color: ${colors.mainGray};
	width: 100px;
	color: white;
`

const Textarea = styled.textarea`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid ${colors.bgBlack};
	background-color: ${colors.mainGray};
	color: white;
	resize: none;
	height: 95px;
`
const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`

export default CommentForm
