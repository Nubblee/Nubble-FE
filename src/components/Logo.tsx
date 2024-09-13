import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import logo from '../assets/logo.svg'

interface LogoProps {
	logoWidth: number
	clickable?: boolean
}

const Logo: React.FC<LogoProps> = ({ logoWidth, clickable = false }) => {
	const navigate = useNavigate()

	const onLogoClick = (): void => {
		navigate('/')
	}

	return (
		<LogoStyle
			src={logo}
			alt="Nubble Logo"
			logoWidth={logoWidth}
			clickable={clickable}
			onClick={clickable ? onLogoClick : undefined}
		/>
	)
}

const LogoStyle = styled.img<{ logoWidth: number; clickable: boolean }>`
	width: ${({ logoWidth }) => `${logoWidth}px`};
	cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`

export default Logo
