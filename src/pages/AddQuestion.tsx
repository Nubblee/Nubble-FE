import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import colors from '@/constants/color'
import Button from '@components/Button'
import { fontSize } from '@/constants/font'

const AddQuestion = () => {
	const [formData, setFormData] = useState({
		title: '',
		link: '',
		date: '',
	})

	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	useEffect(() => {
		const { title, link, date } = formData
		if (title && link && date) {
			setIsButtonDisabled(false)
		} else {
			setIsButtonDisabled(true)
		}
	}, [formData])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}))
	}

	return (
		<Container>
			<Form>
				<Title>코딩테스트 문제 추가하기</Title>
				<InputZone>
					<InputDate type="date" name="date" value={formData.date} onChange={handleInputChange} />
					<Input
						placeholder="문제 제목을 입력해주세요"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
					/>
					<Input
						placeholder="문제 링크를 입력해주세요"
						name="link"
						value={formData.link}
						onChange={handleInputChange}
					/>
					{isButtonDisabled && <Warning>모든 입력을 채워주세요</Warning>}
				</InputZone>
				<ButtonWrapper>
					<SubmitButton disabled={isButtonDisabled}>등록하기</SubmitButton>
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
	height: 340px;
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
	margin: 0 auto;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	max-width: 500px;
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
	color: #707070;
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

const Warning = styled.span`
	color: red;
	font-size: ${fontSize.xs};
`

const QuestionList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 20px;
	width: 100%;
`

export default AddQuestion
