import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import colors from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	variant?: ButtonVariant
	size?: ButtonSize
	radius?: number
	disabled?: boolean
	to?: string

	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
	children,
	variant = 'primary',
	size = 'md',
	radius = 10,
	disabled = false,
	to,
	onClick,
	...props
}: ButtonProps) => {
	return to && !disabled ? (
		<Link to={to}>
			<ButtonComponent variant={variant} radius={radius} disabled={disabled} size={size} {...props}>
				{children}
			</ButtonComponent>
		</Link>
	) : (
		<ButtonComponent
			variant={variant}
			onClick={onClick}
			radius={radius}
			disabled={disabled}
			size={size}
			{...props}
		>
			{children}
		</ButtonComponent>
	)
}

export default Button

const sizeStyles = {
	sm: {
		width: '65px',
		height: '29px',
		padding: '5px',
		fontSize: `${fontSize.sm}`,
	},
	md: {
		width: '90px',
		height: '37px',
		padding: '8px',
		fontSize: `${fontSize.md}`,
	},
}

const ButtonComponent = styled.button<ButtonProps>`
	width: ${({ size = 'md' }) => sizeStyles[size].width};
	height: ${({ size = 'md' }) => sizeStyles[size].height};
	font-size: ${({ size = 'md' }) => sizeStyles[size].fontSize};
	padding: ${({ size = 'md' }) => sizeStyles[size].padding};
	font-weight: ${fontWeight.medium};
	align-items: center;
	justify-content: center;
	border-radius: ${({ radius }) => radius}px;
	background-color: ${({ variant }) =>
		variant === 'primary' ? `${colors.primaryBlue}` : 'transparent'};
	color: ${({ variant }) =>
		variant === 'primary' ? `${colors.mainGray}` : `${colors.primaryBlue}`};
	border: ${({ variant }) =>
		variant === 'secondary' ? `1px solid ${colors.primaryBlue}` : 'none'};

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		background-color: ${({ variant }) =>
			variant === 'primary' ? `${colors.hoverBlue}` : `${colors.deleteGray}`};
		color: ${({ variant }) => variant === 'primary' && `${colors.white}`};
		transition: 0.2s;
	}

	&:disabled {
		cursor: not-allowed;
		background-color: ${colors.deleteGray};
		color: ${colors.commentBlack};
	}
`
