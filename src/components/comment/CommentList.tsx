import styled from '@emotion/styled'
import colors from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import { Trash2 } from 'lucide-react'

// 댓글 데이터의 타입을 정의
interface Comment {
	id: number
	nickname: string
	content: string
	date: string
}

const CommentList = () => {
	const commentsData: Comment[] = [
		{ id: 1, nickname: '하츄핑', content: '댓글 내용 1', date: '2024년 9월 12일' },
		{ id: 2, nickname: '하츄핑', content: '댓글 내용 2', date: '2024년 9월 12일' },
		{ id: 3, nickname: '하츄핑', content: '댓글 내용 3', date: '2024년 9월 12일' },
	]

	return (
		<List>
			{commentsData.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</List>
	)
}

const CommentItem = ({ comment }: { comment: Comment }) => {
	return (
		<Item>
			<Header>
				<Nickname>{comment.nickname}</Nickname>
				<Date>{comment.date}</Date>
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
	background-color: ${colors.mainGray};
	border-radius: 5px;
	border: 1px solid ${colors.bgBlack};
	color: white;
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
