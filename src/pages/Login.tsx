import React, { useState } from 'react'
import styled from '@emotion/styled'
import colors from '@/constants/color'
import Logo from '@components/Logo'
import { fontSize, fontWeight } from '@/constants/font'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const Login: React.FC = () => {
	const [id, setId] = useState('')
	const [pw, setPw] = useState('')
	const [error, setError] = useState(false)
	const navigate = useNavigate()
	const login = useAuthStore((state) => state.login)

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await getUser()
	}

	const getUser = async () => {
		try {
			await axios.post(
				'http://nubble-backend-eb-1-env.eba-f5sb82hp.ap-northeast-2.elasticbeanstalk.com/sessions',
				{
					username: id,
					password: pw,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				},
			)
			console.log('로그인 성공!!!!!!!!!!!!!!!')
			login()
			await checkSessionStatus()
			navigate('/')
		} catch {
			setError(true)
		}
	}

	const checkSessionStatus = async () => {
		try {
			await axios.get(
				'http://nubble-backend-eb-1-env.eba-f5sb82hp.ap-northeast-2.elasticbeanstalk.com/sessions/validate',
				{
					withCredentials: true,
				},
			)
			console.log('로그인 된 상태')
		} catch (error) {
			console.error('로그인 안됨 ㅠㅠ', error)
		}
	}

	return (
		<Container>
			<Logo logoWidth={360} />
			<span className="login-desc">로그인 정보를 입력해주세요.</span>
			<form className="form-container" onSubmit={handleLogin}>
				<input value={id} placeholder="아이디" onChange={(e) => setId(e.target.value)} />
				<input
					value={pw}
					type="password"
					placeholder="비밀번호"
					onChange={(e) => setPw(e.target.value)}
				/>
				<span className={`error-message ${error ? 'show' : ''}`}>
					아이디와 비밀번호를 확인해주세요.
				</span>
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

	.login-desc {
		color: ${colors.commentGray};
		text-align: left;
		width: 390px;
		margin: 28px 0 48px 0;
	}

	.error-message {
		font-size: ${fontSize.sm};
		font-weight: ${fontWeight.light};
		color: #d62323;
		display: none;
	}

	.error-message.show {
		display: block;
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
