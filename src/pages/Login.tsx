import React from 'react'
import styled from '@emotion/styled'
import colors from '@/constants/color'
import Logo from '@components/Logo'
import { fontSize } from '@/constants/font'

const Login: React.FC = () => {
	return (
		<Container>
			<Logo logoWidth={360} />
			<span>로그인 정보를 입력해주세요.</span>
			<form className="form-container" onSubmit={() => {}}>
				<input type="text" name="userName" placeholder="아이디" />
				<input type="password" name="password" placeholder="비밀번호" />
				<button type="submit" className="login-btn">
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
	}
`

export default Login
