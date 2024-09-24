import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import colors from '@/constants/color'
import Button from '@components/Button'
import { fontSize } from '@/constants/font'
import { Trash2 } from 'lucide-react' // 삭제 아이콘 사용

// Question 인터페이스를 정의하여 타입을 명시
interface Question {
	title: string
	link: string
	date: string // date는 문자열로 관리
}

const AddQuestion = () => {
	const [formData, setFormData] = useState<Question>({
		title: '',
		link: '',
		date: '',
	})

	const [questions, setQuestions] = useState<Question[]>([]) // 상태에 대한 타입 명시
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
	const handleAddQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const { title, link, date } = formData
		if (title && link && date) {
			setQuestions([...questions, formData])
			setFormData({ title: '', link: '', date: '' })
		}
	}

	const handleDelete = (index: number) => {
		const updatedQuestions = questions.filter((_, i) => i !== index) // 선택한 문제 삭제
		setQuestions(updatedQuestions)
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
					{isButtonDisabled && <Warning>전부 입력했니? ^^</Warning>}
				</InputZone>
				<ButtonWrapper>
					<SubmitButton disabled={isButtonDisabled} onClick={handleAddQuestion}>
						등록하기
					</SubmitButton>
				</ButtonWrapper>
			</Form>
			<QuestionList>
				<TableHeader>
					<span>날짜</span>
					<span>문제 제목</span>
					<span></span> {/* 삭제 아이콘 자리 */}
				</TableHeader>
				{questions.map((question, index) => (
					<QuestionItem key={index}>
						<span>{question.date}</span>
						<span>{question.title}</span>
						<DeleteIcon onClick={() => handleDelete(index)}>
							<Trash2 size={20} />
						</DeleteIcon>
					</QuestionItem>
				))}
			</QuestionList>
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

const Warning = styled.span`
	color: red;
	font-size: ${fontSize.xs};
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
	width: 100%;
	margin-top: 20px;
`

const TableHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	border-bottom: 1px solid ${colors.commentGray};
	span {
		width: 30%;
		text-align: left;
		font-size: ${fontSize.md};
		color: white;
	}
`

const QuestionItem = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px 0;
	border-bottom: 1px solid ${colors.commentGray};
	span {
		width: 33%;
		text-align: left;
		font-size: ${fontSize.md};
		color: white;
	}
`

const DeleteIcon = styled.div`
	color: red;
	cursor: pointer;
	margin-left: 240px;
`

export default AddQuestion
