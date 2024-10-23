import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ImagePlus, ArrowLeft } from 'lucide-react'
import styled from '@emotion/styled'
import axios from 'axios'
import colors from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import Button from '@components/Button'
import RenderMarkdown from '@components/RenderMarkdown'
import SelectBox from '@components/SelectBox'
import useCategory from '@/hooks/useCategory'
import useFileUpload from '@/hooks/useFileUpload'
import { useWriteStore } from '@/stores/writeStore'
import useWrite from '@/hooks/useWrite'
import { useAuthStore } from '@/stores/authStore'

interface Post {
	markdownTitle: string
	content: string
	category: string
	subCategory: string
}

const postsData: Record<string, Post> = {
	1: {
		markdownTitle: '나는 1번이다',
		content: '나는 1번이다 이건 테스트임',
		category: 'study',
		subCategory: 'cs',
	},
	2: {
		markdownTitle: '나는 2번이다',
		content: '나는 2번이다 이건 아까와 똑같은 테스트임',
		category: 'study',
		subCategory: 'cs',
	},
}

const WritePage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const id = queryParams.get('id')
	const fileRef = useRef<HTMLInputElement>(null)
	const readRef = useRef<HTMLDivElement>(null)
	const [isEditing, setIsEditing] = useState(false)
	const { selectedCategory, selectedSubCategory, handleSelectedData, handleSubData } = useCategory()
	const { uploadFile } = useFileUpload()
	const [boards, setBoards] = useState([])
	const {
		markdownContent,
		markdownTitle,
		categories,
		boardId,
		setTitle,
		setContent,
		setThumbnail,
		setCategories,
		setBoardId,
		setDescription,
	} = useWrite()
	const { sessionId } = useAuthStore()

	const handleUploadFile = () => {
		if (fileRef.current) {
			fileRef.current.click()
		}
	}

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const newImages: string[] = []

			for (const file of files) {
				try {
					const res = await uploadFile(file)
					newImages.push(`![](${res.baseUrl + res.fileName})`)
				} catch (error) {
					return
				}
			}
			const currentState = useWriteStore.getState().content
			setContent(currentState + newImages.join('\n'))
		}
	}

	const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
		const items = e.clipboardData.items
		let newContent = markdownContent

		for (let item of items) {
			if (item.kind === 'file' && item.type.startsWith('image/')) {
				const file = item.getAsFile()
				if (file) {
					const res = await uploadFile(file)
					newContent += `![](${res.baseUrl + res.fileName})`
					e.preventDefault()
				}
			}
		}
		setContent(newContent)
	}

	const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value)

		if (readRef.current) {
			readRef.current.scrollTop = readRef.current.scrollHeight
		}
	}

	const handleBack = () => {
		setTitle('')
		setContent('')
		setThumbnail('')

		navigate(-1)
	}

	const fetchCategory = async () => {
		const res = await axios.get(
			`http://nubble-backend-eb-1-env.eba-f5sb82hp.ap-northeast-2.elasticbeanstalk.com/categories`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		setCategories(res.data.categories)
	}

	const fetchBoards = async (categoryId: string) => {
		const res = await axios.get(
			`http://nubble-backend-eb-1-env.eba-f5sb82hp.ap-northeast-2.elasticbeanstalk.com/categories/${categoryId}/boards`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		setBoards(res.data.boards)
	}

	const handleSubmit = () => {
		setTitle(markdownTitle)
		setContent(markdownContent)
		setThumbnail(markdownContent)
		setDescription(markdownContent)
		navigate('/preview')
	}

	const handleDraft = async () => {
		try {
			const res = await axios.post(
				'http://nubble-backend-eb-1-env.eba-f5sb82hp.ap-northeast-2.elasticbeanstalk.com/posts',
				{
					title: markdownTitle,
					content: markdownContent,
					boardId,
					status: 'DRAFT',
					description: markdownContent.slice(0, 10),
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'SESSION-ID': sessionId,
					},
				},
			)
			return res
		} catch (error) {
			//임시저장 실패, 성공시 알림 모달 또는 토스트 알림 필요해보임
			console.log('수정하기 에러', error)
		}
	}

	// useEffect(() => {
	// 	if (id) {
	// 		setIsEditing(true)
	// 		const post = postsData[id]
	// 		if (post) {
	// 			setTitle(post.markdownTitle)
	// 			setContent(post.content)
	// 			setSelectedCategory(post.category)
	// 			setSelectedSubCategory(post.subCategory)
	// 		}
	// 	}
	// }, [id])

	useEffect(() => {
		fetchCategory()
	}, [])

	useEffect(() => {
		if (selectedCategory) {
			fetchBoards(selectedCategory)
			setBoardId(Number(selectedCategory))
		}
	}, [selectedCategory])

	return (
		<Container>
			<div className="area-write">
				<input
					className="write-markdownTitle"
					type="text"
					value={markdownTitle}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="제목을 입력하세요"
				/>
				<div className="gray-line" />
				<div className="area-choice">
					<input
						type="file"
						multiple
						ref={fileRef}
						style={{ display: 'none' }}
						onChange={handleFileChange}
					/>
					<IconButton onClick={handleUploadFile}>
						<ImagePlus size={30} />
						이미지 업로드
					</IconButton>
					<div className="select-category">
						<SelectBox
							options={categories}
							selectedValue={selectedCategory}
							placeholder="카테고리 선택"
							handleChange={handleSelectedData}
						/>
						<SelectBox
							options={boards}
							selectedValue={selectedSubCategory}
							placeholder="내용 선택"
							handleChange={handleSubData}
							disabled={!selectedCategory}
						/>
					</div>
				</div>
				<textarea
					className="content"
					placeholder="내용을 입력하세요."
					value={markdownContent}
					onChange={handleContent}
					onPaste={handlePaste}
				/>
				<div className="area-footer">
					<IconButton onClick={handleBack}>
						<ArrowLeft size={25} />
						나가기
					</IconButton>
					<div className="area-button">
						<Button
							variant="secondary"
							radius={50}
							onClick={handleDraft}
							disabled={!(markdownTitle && markdownContent)}
						>
							임시저장
						</Button>
						{isEditing ? (
							<Button radius={50}>수정하기</Button>
						) : (
							<Button
								radius={50}
								onClick={handleSubmit}
								disabled={!(markdownTitle && markdownContent)}
							>
								등록하기
							</Button>
						)}
					</div>
				</div>
			</div>
			<div ref={readRef} className="area-read">
				<div className="markdownTitle">{markdownTitle}</div>
				<RenderMarkdown markdown={markdownContent} />
			</div>
		</Container>
	)
}

export default WritePage

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;

	input::placeholder {
		color: ${colors.commentGray};
	}

	.content,
	.write-markdownTitle {
		color: ${colors.white};
	}

	.content::-webkit-scrollbar,
	.area-read::-webkit-scrollbar {
		width: 8px;
	}

	.content::-webkit-scrollbar-thumb,
	.area-read::-webkit-scrollbar-thumb {
		background-color: ${colors.white};
		border-radius: 4px;
	}

	.area-write {
		position: relative;
		width: 100%;
		padding: 0px 30px;
		background-color: ${colors.bgBlack};
		padding-bottom: 70px;

		.write-markdownTitle {
			width: 100%;
			font-size: ${fontSize.xxxxxl};
			font-weight: ${fontWeight.semiBold};
			background-color: inherit;
			outline: none;
			margin: 40px 0px 30px;
		}

		textarea {
			border: none;
			outline: none;
		}

		.content {
			width: 100%;
			overflow-y: auto;
			font-size: ${fontSize.lg};
			background-color: inherit;
			border: none;
			padding: 10px;
			resize: none;
			height: calc(100vh - 260px);
		}
	}

	.gray-line {
		width: 100%;
		height: 3px;
		background-color: ${colors.commentGray};
	}

	.area-choice,
	.area-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.area-choice {
		margin: 20px 0;

		.select-category {
			display: flex;
			gap: 10px;
		}
	}

	.area-exit {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.area-read {
		width: 100%;
		overflow-y: auto;
		flex-direction: column;
		padding: 40px;
		line-height: 1.3;
		background-color: ${colors.mainBlack};
		font-size: ${fontSize.md};

		.markdownTitle {
			font-size: ${fontSize.xxxxxl};
			font-weight: ${fontWeight.semiBold};
			margin-bottom: 50px;
		}
	}

	.area-footer {
		width: 100%;
		height: 70px;
		position: absolute;
		padding: 0px 30px;
		background-color: ${colors.mainGray};
		left: 0;
		bottom: 0;

		.area-button {
			display: flex;
			gap: 10px;
		}
	}
`
const IconButton = styled.button`
	display: flex;
	align-items: center;
	gap: 8px;
	background-color: inherit;
	color: ${colors.commentGray};
	border: none;
	cursor: pointer;
	font-size: ${fontSize.lg};
	font-weight: ${fontWeight.regular};

	&:hover {
		color: ${colors.white};
	}
`
