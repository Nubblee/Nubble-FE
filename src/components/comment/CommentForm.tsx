import colors from '@/constants/color'
import Button from '@components/Button'
import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'

const CommentForm = () => {
	// 닉네임, 비밀번호, 댓글 입력값 상태 관리
	const [formData, setFormData] = useState({
		nickname: '',
		password: '',
		comment: '',
	})
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	// 모든 입력 필드가 채워졌는지 확인하는 로직
	useEffect(() => {
		const { nickname, password, comment } = formData
		if (nickname && password && comment) {
			setIsButtonDisabled(false)
		} else {
			setIsButtonDisabled(true)
		}
	}, [formData])

	// input과 textarea의 값이 변경될 때 상태를 업데이트
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}))
	}

	return (
		<Form>
			<InputZone>
				<Input
					name="nickname"
					placeholder="닉네임"
					value={formData.nickname}
					onChange={handleInputChange}
				/>
				<Input
					name="password"
					type="password"
					placeholder="비밀번호"
					value={formData.password}
					onChange={handleInputChange}
				/>
			</InputZone>
			<Textarea
				name="comment"
				placeholder="댓글을 작성하세요"
				value={formData.comment}
				onChange={handleInputChange}
			/>
			<ButtonWrapper>
				<Button disabled={isButtonDisabled}>등록하기</Button>
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
