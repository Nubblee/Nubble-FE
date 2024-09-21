import React from 'react'
import styled from '@emotion/styled'
import BestContents from '@components/BestContents'
import Banner from '@components/Banner'
import colors from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import { useNavigate } from 'react-router-dom'

const postData = [
	{
		id: 1,
		image: 'https://i.pinimg.com/564x/db/03/74/db0374bf620649c74c40cddb4c176cd6.jpg',
		userName: '김수민',
		date: '2024년 9월 16일',
		title: 'Migrating to Linear 101',
		content: 'Linear helps streamline software projects, sprints, task 어쩌구 저쩌구 자를거임',
	},
	{
		id: 2,
		image: 'https://i.pinimg.com/564x/db/03/74/db0374bf620649c74c40cddb4c176cd6.jpg',
		userName: '김수민',
		date: '2024년 9월 16일',
		title: 'Migrating to Linear 101',
		content: 'Linear helps streamline software projects, sprints, task 어쩌구 저쩌구 자를거임',
	},
	{
		id: 3,
		image: 'https://i.pinimg.com/564x/db/03/74/db0374bf620649c74c40cddb4c176cd6.jpg',
		userName: '김수민',
		date: '2024년 9월 16일',
		title: 'Migrating to Linear 101',
		content: 'Linear helps streamline software projects, sprints, task 어쩌구 저쩌구 자를거임',
	},
	{
		id: 4,
		image: 'https://i.pinimg.com/564x/db/03/74/db0374bf620649c74c40cddb4c176cd6.jpg',
		userName: '김수민',
		date: '2024년 9월 16일',
		title: 'Migrating to Linear 101',
		content: 'Linear helps streamline software projects, sprints, task 어쩌구 저쩌구 자를거임',
	},
	{
		id: 5,
		image: 'https://i.pinimg.com/564x/db/03/74/db0374bf620649c74c40cddb4c176cd6.jpg',
		userName: '김수민',
		date: '2024년 9월 16일',
		title: 'Migrating to Linear 101',
		content: 'Linear helps streamline software projects, sprints, task 어쩌구 저쩌구 자를거임',
	},
	{
		id: 6,
		image: 'https://i.pinimg.com/564x/db/03/74/db0374bf620649c74c40cddb4c176cd6.jpg',
		userName: '김수민',
		date: '2024년 9월 16일',
		title: 'Migrating to Linear 101',
		content: 'Linear helps streamline software projects, sprints, task 어쩌구 저쩌구 자를거임',
	},
	{
		id: 7,
		image: 'https://i.pinimg.com/564x/db/03/74/db0374bf620649c74c40cddb4c176cd6.jpg',
		userName: '김수민',
		date: '2024년 9월 16일',
		title: 'Migrating to Linear 101',
		content: 'Linear helps streamline software projects, sprints, task 어쩌구 저쩌구 자를거임',
	},
]

const Home: React.FC = () => {
	const navigate = useNavigate()
	return (
		<Container>
			<Banner />
			<ContentContainer>
				<PostContainer>
					<div className="menu">
						<div className="menu-list">
							<div>코딩테스트</div>
							<div>스터디</div>
						</div>
						<button
							className="write-btn"
							onClick={() => {
								navigate('/write')
							}}
						>
							+ 글쓰기
						</button>
					</div>
					<div className="category">
						<div>Lv.0</div>
						<div>Lv.1</div>
						<div>Lv.2</div>
						<div>Lv.3</div>
					</div>
					<div className="newest-posts">
						<ul>
							{postData.map(({ id, image, userName, date, title, content }) => (
								<li key={id} className="post-list">
									<img src={image} alt={title} />
									<div>
										<div className="post-info">
											<div className="user-name">{userName}</div>
											<div className="date">{date}</div>
										</div>
										<div className="title">{title}</div>
										<div className="content">{content}</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</PostContainer>
				<BestContentsContainer>
					<BestContents />
					<BestContents />
				</BestContentsContainer>
			</ContentContainer>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${colors.bgBlack};
	max-width: 1080px;
	margin: 20px auto;
`
const ContentContainer = styled.div`
	display: flex;
	margin-top: 50px;
`
const PostContainer = styled.div`
	flex-grow: 1;
	margin-right: 40px;
	padding-right: 40px;
	border-right: 1px solid ${colors.white};

	.newest-posts {
		padding-right: 60px;
		max-height: 80%;
		overflow-y: auto;
	}

	.menu {
		display: flex;
		justify-content: space-between;
		color: ${colors.commentGray};
		font-size: ${fontSize.xxl};
		padding-bottom: 20px;
		border-bottom: 2px solid ${colors.commentGray};
		margin-bottom: 20px;

		.menu-list {
			display: flex;

			div {
				margin-right: 20px;
				cursor: pointer;

				&:hover {
					color: ${colors.white};
					font-weight: ${fontWeight.bold};
				}
			}
		}

		.write-btn {
			background-color: transparent;
			color: ${colors.white};
			font-size: ${fontSize.lg};

			&:hover {
				font-weight: ${fontWeight.bold};
			}
		}
	}

	.category {
		display: flex;
		margin-bottom: 20px;

		div {
			margin-right: 14px;
			font-size: ${fontSize.lg};
			color: ${colors.commentGray};
			cursor: pointer;

			&:hover {
				color: ${colors.white};
				font-weight: ${fontWeight.bold};
			}
		}
	}

	.post-list {
		display: flex;
		margin-bottom: 30px;

		img {
			width: 154px;
			height: 118px;
			margin-right: 30px;
		}

		.post-info {
			display: flex;
			font-size: ${fontSize.md};
			color: ${colors.commentGray};
			margin-bottom: 20px;

			div:first-child::after {
				content: '•';
				margin: 0 8px;
			}
		}

		.title {
			font-size: ${fontSize.xl};
			font-weight: ${fontWeight.semiBold};
			margin-bottom: 20px;
		}

		.content {
			color: ${colors.commentGray};
		}
	}
`
const BestContentsContainer = styled.div``

export default Home
