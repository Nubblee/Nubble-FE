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

	const handleCopyUrl = async () => {
		const currentUrl = window.location.href
		try {
			await navigator.clipboard.writeText(currentUrl)
			alert('클립보드에 링크가 복사되었어요.')
		} catch (err) {
			console.log(err)
		}
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
			<IconContainer onClick={handleCopyUrl}>
				<Share2Icon color={colors.primaryBlue} size={24} />
			</IconContainer>
		</MenuContainer>
	)
}

const MenuContainer = styled.div`
	position: fixed;
	left: 18%;
	top: 26%;
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
	transition:
		left 0.3s ease,
		top 0.3s ease; /* 위치 변경을 부드럽게 만듦 */

	@media (max-width: 1440px) {
		left: 12%; /* 1440px 이하에서 점진적으로 변경 */
		top: 26%;
	}

	@media (max-width: 1280px) {
		left: 9%; /* 1280px 이하에서 위치 변경 */
	}

	@media (max-width: 1090px) {
		display: none; /* 1080px 이하에서는 메뉴를 숨김 */
	}
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
