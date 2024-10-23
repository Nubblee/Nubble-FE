import colors from '@/constants/color'
import { fontSize } from '@/constants/font'
import CommentForm from '@components/comment/CommentForm'
import CommentList from '@components/comment/CommentList'
import FloatingMenu from '@components/FloatingMenu'
import styled from '@emotion/styled'
import { type FileContent, useCoteData } from '@/hooks/useCoteData'
import { formatDate } from '@/utils/formatDate'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useWrite from '@/hooks/useWrite'
import Toast from '@components/Toast'

const PostDetail = () => {
	const { title, author } = useParams()
	const { commitData } = useCoteData()
	const [coteData, setCoteData] = useState<FileContent[]>([])
	const { markdownTitle, markdownContent } = useWrite()

	useEffect(() => {
		if (commitData.length) {
			const filteredData = commitData.filter(
				(data) => data.title === title && data.author === author,
			)
			setCoteData(filteredData)
		}
	}, [title, author, commitData])

	return (
		<Container>
			<Toast />
			<FloatingMenu />
			{coteData.map((data) => (
				<Wrapper key={`${data.title}-${data.author}`}>
					<TitleContainer>
						<div>
							<Title>{data.title}</Title>
							<MetaData>
								<DateName>
									<span>{formatDate(data.date)}</span>
									<span>{data.author}</span>
								</DateName>
								<EditDelete>
									<button>수정</button>
									<button>삭제</button>
								</EditDelete>
							</MetaData>
						</div>
					</TitleContainer>
					{data.isCote ? (
						<Content>
							<pre>{data.content}</pre>
						</Content>
					) : (
						<Content>{data.content}</Content>
					)}
					<CommentForm />
					<CommentList />
				</Wrapper>
			))}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	max-width: 780px;
	margin: 20px auto;
	width: 100%;
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const DateName = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`

const Title = styled.h1`
	word-break: keep-all;
	overflow-wrap: break-word;
`

const MetaData = styled.div`
	display: flex;
	justify-content: space-between;
	width: 780px;
	gap: 10px;

	span:last-of-type {
		font-size: ${fontSize.xl};
	}
`

const EditDelete = styled.div`
	display: flex;
	gap: 5px;

	button {
		background: none;
		border: none;
		color: ${colors.commentGray};
		cursor: pointer;

		&:hover {
			text-decoration: underline;
		}
	}
`

const Content = styled.div`
	width: 100%;
	margin-bottom: 50px;
	border-bottom: 1px solid ${colors.commentBlack};
	padding-bottom: 30px;
	line-height: 1.8;

	pre {
		width: 100%;
		white-space: pre-wrap;
	}
`

export default PostDetail
