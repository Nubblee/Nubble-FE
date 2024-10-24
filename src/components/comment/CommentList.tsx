import styled from '@emotion/styled'
import colors from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import { Trash2 } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatDate } from '@/utils/formatDate'

// 댓글 데이터의 타입을 정의
interface Comment {
	commentId: number
	content: string
	createdAt: Date
	userId: number | null
	userName: string | null
	guestName: string | null
	type: 'MEMBER' | 'GUEST'
}

const CommentList = () => {
	const { postId } = useParams<{ postId: string }>()
	const [commentsData, setCommentsData] = useState<Comment[]>([]) // 서버에서 가져온 댓글 데이터를 저장하는 상태
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const res = await axios.get(
					`http://nubble-backend-eb-1-env.eba-f5sb82hp.ap-northeast-2.elasticbeanstalk.com/posts/${postId}/comments`,
				)
				setCommentsData(res.data.comments) // 서버에서 받은 댓글 데이터를 상태에 저장
			} catch (err) {
				setError('댓글을 불러오는 중 오류가 발생했습니다.')
				console.error(err)
			}
		}

		fetchComments() // 컴포넌트가 마운트될 때 서버에서 댓글 데이터를 가져옴
	}, [postId])

	if (error) {
		return <p>{error}</p>
	}

	if (!commentsData.length) {
		return <p>댓글이 없습니다.</p>
	}

	return (
		<List>
			{commentsData.map((comment) => (
				<CommentItem key={comment.commentId} comment={comment} />
			))}
		</List>
	)
}

const CommentItem = ({ comment }: { comment: Comment }) => {
	const displayName = comment.type === 'MEMBER' ? comment.userName : comment.guestName // 회원이면 userName, 게스트면 guestName 사용

	return (
		<Item>
			<Header>
				<Nickname>{displayName}</Nickname> {/* 회원 또는 게스트 이름 표시 */}
				<Date>{formatDate(comment.createdAt)}</Date>
			</Header>
			<Content>{comment.content}</Content>
			<ActionButtons>
				<DeleteButton>
					<Trash2 size={14} />
					<span>삭제</span>
				</DeleteButton>
			</ActionButtons>
		</Item>
	)
}

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

const Item = styled.div`
	padding: 15px;
	background-color: ${colors.bgBlack};
	border-radius: 5px;
	border: 1px solid ${colors.bgBlack};
	color: white;
	border-bottom: 1px solid ${colors.commentBlack};
`

const Header = styled.div`
	display: flex;
	margin-bottom: 10px;
	gap: 10px;
	align-items: center;
`

const Nickname = styled.span`
	font-weight: bold;
	font-size: ${fontSize.md};
	color: ${colors.white};
	font-weight: ${fontWeight.bold};
`

const Date = styled.span`
	color: ${colors.deleteGray};
	font-size: ${fontSize.xs};
`

const Content = styled.p`
	margin: 0 0 10px 0;
	font-size: ${fontSize.md};
	color: ${colors.white};
	font-weight: ${fontWeight.regular};
`

const ActionButtons = styled.div`
	display: flex;
	justify-content: flex-end;
`

const DeleteButton = styled.button`
	display: flex;
	align-items: center;
	font-size: 14px;
	gap: 5px;
	background: none;
	border: none;
	color: ${colors.deleteGray};
	cursor: pointer;
	&:hover {
		color: ${colors.white};
	}

	svg {
		color: inherit; /* 부모의 컬러를 따르도록 설정 */
	}
`

export default CommentList
