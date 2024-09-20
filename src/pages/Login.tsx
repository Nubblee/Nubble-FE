import React, { useState } from 'react'
import styled from '@emotion/styled'
import colors from '@/constants/color'
import Logo from '@components/Logo'
import { fontSize } from '@/constants/font'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
	const [id, setId] = useState('')
	const [pw, setPw] = useState('')
	const navigate = useNavigate()

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await getUser()
	}

	async function getUser() {
		const res = await fetch(
			'http://nubble-backend-eb-1-env.eba-f5sb82hp.ap-northeast-2.elasticbeanstalk.com/sessions',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: id,
					password: pw,
				}),
				credentials: 'include',
			},
		)

		if (res.ok) {
			console.log('로그인 성공!!!!!!!!!!!!!!!')
			navigate('/')
		} else {
			alert('아이디랑 비밀번호를 확인해주세요.')
		}
	}

	return (
		<Container>
			<Logo logoWidth={360} />
			<span>로그인 정보를 입력해주세요.</span>
			<form className="form-container" onSubmit={handleLogin}>
				<input value={id} placeholder="아이디" onChange={(e) => setId(e.target.value)} />
				<input
					value={pw}
					type="password"
					placeholder="비밀번호"
					onChange={(e) => setPw(e.target.value)}
				/>
				<button type="submit" className="login-btn" disabled={!id || !pw}>
					로그인
				</button>
			</form>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background-color: ${colors.bgBlack};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.form-container {
		display: flex;
		flex-direction: column;
		width: 390px;
	}

	input {
		width: 100%;
		background-color: transparent;
		height: 48px;
		margin-bottom: 24px;
		border: none;
		border-bottom: 1.5px solid ${colors.commentGray};
		color: ${colors.white};
		padding: 10px;
		font-size: ${fontSize.lg};
	}

	span {
		color: ${colors.commentGray};
		text-align: left;
		width: 390px;
		margin: 28px 0 48px 0;
	}

	.login-btn {
		width: 100%;
		height: 48px;
		text-align: center;
		background-color: ${colors.primaryBlue};
		color: ${colors.commentBlack};
		border-radius: 12px;
		margin-top: 24px;

		&:hover {
			background-color: ${colors.hoverBlue};
			color: ${colors.white};
		}

		&:disabled {
			background-color: ${colors.commentBlack};
			color: ${colors.commentGray};
			cursor: not-allowed;

			&:hover {
				background-color: ${colors.commentBlack};
				color: ${colors.commentGray};
			}
		}
	}
`

export default Login
