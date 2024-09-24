import styled from '@emotion/styled'
import colors from '@/constants/color'
import Button from '@components/Button'
import { fontSize } from '@/constants/font'

const AddQuestion = () => {
	return (
		<Container>
			<Form>
				<Title>코딩테스트 문제 추가하기</Title>
				<InputZone>
					<InputDate type="date" placeholder="날짜 입력" />
					<Input placeholder="문제 제목을 입력해주세요" />
					<Input placeholder="문제 링크를 입력해주세요" />
				</InputZone>
				<ButtonWrapper>
					<SubmitButton>등록하기</SubmitButton>
				</ButtonWrapper>
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
	margin: 0 auto;
	padding: 20px;
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;

	background-color: ${colors.mainGray};
	gap: 20px;
	width: 100%;
	height: 320px;
	padding: 10px;
	border-radius: 8px;
`

const Title = styled.h1`
	display: flex;
	justify-content: center;
	font-size: ${fontSize.xxxl};
	margin-top: 30px;
`

const InputZone = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 14px;
`

const InputDate = styled.input`
	width: 100%;
	max-width: 160px;
	height: 40px;
	padding: 8px;
	font-size: 16px;
	border-radius: 4px;
	background-color: ${colors.commentGray};
	color: white;
`

const Input = styled.input`
	width: 100%;
	max-width: 500px;
	height: 40px;
	padding: 8px;
	font-size: 16px;
	border-radius: 4px;

	background-color: ${colors.commentGray};
	color: white;
`

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 0 10px 18px 0;
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
