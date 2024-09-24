import styled from '@emotion/styled'
import colors from '@/constants/color'
import Button from '@components/Button'

const AddQuestion = () => {
	return (
		<Container>
			<Form>
				<InputZone>
					<InputDate type="date" placeholder="날짜 입력" />
					<Input placeholder="문제 제목을 입력해주세요" />
					<Input placeholder="문제 링크를 입력해주세요" />
				</InputZone>
				<SubmitButton>등록하기</SubmitButton>
			</Form>
			<QuestionList>{/* 문제 리스트 부분 */}</QuestionList>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	max-width: 900px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 auto; /* 중앙 정렬 */
	padding: 20px;
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${colors.mainGray};
	gap: 20px;
	width: 100%;
	height: 300px;
	padding: 20px;
	border-radius: 8px;
`

const InputZone = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 10px;
`

const InputDate = styled.input`
	width: 100%;
	max-width: 300px;
	height: 40px;
	padding: 8px;
	font-size: 16px;
	border-radius: 4px;

	background-color: ${colors.commentGray};
	color: white;
`

const Input = styled.input`
	width: 100%;
	max-width: 600px;
	height: 40px;
	padding: 8px;
	font-size: 16px;
	border-radius: 4px;

	background-color: ${colors.commentGray};
	color: white;
`

const SubmitButton = styled(Button)`
	width: 100px;
	height: 40px;

	color: white;
	font-size: 16px;
`

const QuestionList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 20px;
	width: 100%;
`

export default AddQuestion
