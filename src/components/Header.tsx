import React, { useState } from 'react'
import styled from '@emotion/styled'
import Logo from '@components/Logo'
import { Package, Search } from 'lucide-react'
import { fontWeight } from '@/constants/font'
import colors from '@/constants/color'
import { useNavigate } from 'react-router-dom'

const Header = () => {
	const [userName, setUserName] = useState<string>('박지영')
	const navigate = useNavigate()

	return (
		<Container>
			<Logo logoWidth={160} clickable={true} />
			<div className="right-content">
				<SearchForm>
					<Search className="search-icon" strokeWidth={1.5} color={colors.commentGray} size={16} />
					<input type="text" placeholder="검색" />
				</SearchForm>
				<Package
					strokeWidth={2}
					className="box-icon"
					onClick={() => {
						navigate('/saves')
					}}
				/>
				<div className="user-name">
					안녕하세요, <span>{userName}</span>님!
				</div>
			</div>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 26px 110px;

	.right-content {
		display: flex;
		align-items: center;
	}

	.box-icon {
		width: 24px;
		height: 24px;
		cursor: pointer;
	}

	.user-name {
		margin-left: 10px;
		font-weight: ${fontWeight.bold};

		span {
			color: ${colors.primaryBlue};
		}
	}
`

const SearchForm = styled.form`
	position: relative;
	display: flex;
	align-items: center;

	input {
		width: 174px;
		padding: 8px 0px 8px 38px;
		border-radius: 5px;
		margin-right: 22px;
		border: none;

		&::placeholder {
			color: ${colors.commentGray};
		}
	}

	.search-icon {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
	}
`

export default Header
