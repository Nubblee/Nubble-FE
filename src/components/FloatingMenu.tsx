/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { useState } from 'react'
import { HeartIcon, Share2Icon } from 'lucide-react'
import colors from '@/constants/color'

const FloatingMenu = () => {
	const [liked, setLiked] = useState(false)
	const [likeCount, setLikeCount] = useState(0)

	const handleLikeClick = () => {
		setLiked(!liked)
		setLikeCount(liked ? likeCount - 1 : likeCount + 1)
	}

	return (
		<MenuContainer>
			<IconContainer onClick={handleLikeClick}>
				<HeartIcon
					color={colors.primaryBlue}
					fill={liked ? colors.primaryBlue : 'none'}
					size={24}
				/>
				<LikeCount>{likeCount}</LikeCount>
			</IconContainer>
			<IconContainer>
				<Share2Icon color={colors.primaryBlue} size={24} />
			</IconContainer>
		</MenuContainer>
	)
}

const MenuContainer = styled.div`
	position: fixed;
	left: 239px;
	top: 331px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	width: 54px;
	height: 137px;
	background-color: ${colors.commentBlack};
	border: 1px solid ${colors.primaryBlue};
	padding: 10px;
	border-radius: 30px;
`

const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	color: white;

	&:hover {
		transform: scale(1.1);
		transition: transform 0.2s;
	}
`

const LikeCount = styled.span`
	margin-top: 5px;
	font-size: 14px;
	color: ${colors.primaryBlue};
`

export default FloatingMenu
