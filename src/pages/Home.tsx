import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import BestContents from '@components/BestContents'
import Banner from '@components/Banner'
import colors from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import useCheckSession from '@/hooks/useCheckSession'
import axios from 'axios'
import { useCoteData } from '@/hooks/useCoteData'

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
	useCheckSession()
	const { isLogin } = useAuthStore()
	const navigate = useNavigate()
	const login = useAuthStore((state) => state.login)
	const { commitData } = useCoteData()

	useEffect(() => {
		const getUserInfo = async () => {
			const sessionId = localStorage.getItem('sessionId')

			if (!sessionId) {
				console.error('session Id ❌')
				return
			}

			const res = await axios.get(
				'http://nubble-backend-eb-1-env.eba-f5sb82hp.ap-northeast-2.elasticbeanstalk.com/users/me',
				{
					headers: {
						'Content-Type': 'application/json',
						'SESSION-ID': sessionId,
					},
				},
			)
			console.log(res)
			localStorage.setItem('userName', res.data.nickname)
			localStorage.setItem('userId', res.data.username)
			login(sessionId, res.data.username, res.data.nickname)
		}
		getUserInfo()
	}, [login])

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
						{isLogin && (
							<button
								className="write-btn"
								onClick={() => {
									navigate('/write')
								}}
							>
								+ 글쓰기
							</button>
						)}
					</div>
					<div className="category">
						<div>Lv.0</div>
						<div>Lv.1</div>
						<div>Lv.2</div>
						<div>Lv.3</div>
					</div>
					<div className="newest-posts">
						<ul>
							{commitData.map((data) => (
								<Link
									to={`/postDetail/${data.author}/${data.title}`}
									key={`${data.title}-${data.author}`}
								>
									<li className="post-list">
										<img
											src={
												'https://i.pinimg.com/564x/db/03/74/db0374bf620649c74c40cddb4c176cd6.jpg'
											}
											alt={data.title}
										/>
										<div>
											<div className="post-info">
												<div className="user-name">{data.author}</div>
												<div className="date">{data.date}</div>
											</div>
											<div className="title">{data.title}</div>
											<div className="content">{data.content}</div>
										</div>
									</li>
								</Link>
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

			div:first-of-type::after {
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
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
`
const BestContentsContainer = styled.div``

export default Home
