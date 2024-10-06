import React, { useEffect, useState } from 'react'
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
import { formatDate } from '@/utils/formatDate'

const studyData = [
	{
		img: 'https://i.pinimg.com/474x/89/ca/b2/89cab28eb0e0045de4b1c2f2a45c7130.jpg',
		author: '손성오',
		date: '2024년 8월 9일',
		title: 'Next.js App Router에 대해서',
		content:
			'The Next.js App Router introduces a new model for building applications using Reacts latest features such as Server Components, Streaming with Suspense, and Server Actions.',
	},
	{
		img: 'data:image/jpeg;base64,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',
		author: '손성오',
		date: '2024년 8월 19일',
		title: 'Next.js App Router에 대해서2',
		content:
			'The Next.js App Router introduces a new model for building applications using Reacts latest features such as Server Components, Streaming with Suspense, and Server Actions.',
	},
	{
		img: 'data:image/jpeg;base64,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',
		author: '김수민',
		date: '2024년 10월 9일',
		title: 'Next.js App Router에 대해서',
		content:
			'The Next.js App Router introduces a new model for building applications using Reacts latest features such as Server Components, Streaming with Suspense, and Server Actions.',
	},
	{
		img: 'data:image/png;base64,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',
		author: '박지영',
		date: '2024년 8월 29일',
		title: 'Next.js App Router에 대해서',
		content:
			'The Next.js App Router introduces a new model for building applications using Reacts latest features such as Server Components, Streaming with Suspense, and Server Actions.',
	},
	{
		img: 'data:image/png;base64,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',
		author: '유원우',
		date: '2024년 9월 8일',
		title: 'Next.js App Router에 대해서',
		content:
			'The Next.js App Router introduces a new model for building applications using Reacts latest features such as Server Components, Streaming with Suspense, and Server Actions.',
	},
]

const Home: React.FC = () => {
	useCheckSession()
	const { isLogin } = useAuthStore()
	const navigate = useNavigate()
	const login = useAuthStore((state) => state.login)
	const { commitData } = useCoteData()
	const [selectedTab, setSelectedTab] = useState<'cote' | 'study'>('cote')

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
							<div onClick={() => setSelectedTab('cote')} style={{ cursor: 'pointer' }}>
								코딩테스트
							</div>
							<div onClick={() => setSelectedTab('study')} style={{ cursor: 'pointer' }}>
								스터디
							</div>
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
					{selectedTab === 'cote' && (
						<div className="cote-posts">
							<div className="category">
								<div>Lv.0</div>
								<div>Lv.1</div>
								<div>Lv.2</div>
								<div>Lv.3</div>
							</div>
							<ul>
								{commitData.map((data) => (
									<Link
										to={`/postDetail/${data.author}/${data.title}`}
										key={`${data.title}-${data.author}`}
									>
										<li className="post-list">
											<div>
												<div className="title-container">
													<div className="title">{data.title}</div>
													<div className="post-info">
														<div className="author">{data.author}</div>
														<div className="date">{formatDate(data.date)}</div>
													</div>
												</div>
												<div className="content">{data.content}</div>
											</div>
										</li>
									</Link>
								))}
							</ul>
						</div>
					)}

					{selectedTab === 'study' && (
						<div className="study-posts">
							<ul>
								{studyData.map((data) => (
									<li className="post-list" key={`${data.title}-${data.author}`}>
										<img src={data.img} alt={data.title} />
										<div>
											<div className="post-info">
												<div className="author">{data.author}</div>
												<div className="date">{data.date}</div>
											</div>
											<div className="title">{data.title}</div>
											<div className="content">{data.content}</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					)}
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

	.cote-posts {
		.title-container {
			display: flex;
			justify-content: space-between;

			.author {
				font-size: ${fontSize.sm};
			}
			.date {
				font-size: ${fontSize.sm};
			}
		}

		padding-right: 60px;
		max-height: 80%;
		overflow-y: auto;
	}

	.study-posts {
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
