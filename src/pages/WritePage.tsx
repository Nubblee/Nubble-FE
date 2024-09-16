import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImagePlus, ArrowLeft } from 'lucide-react'
import styled from '@emotion/styled'
import colors from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import Button from '@components/Button'
import RenderMarkdown from '@components/RenderMarkdown'
import SelectBox from '@components/SelectBox'

const selectData = [
	{
		key: 'study',
		value: '스터디',
	},
]
const subData = {
	study: [
		{ key: 'cs', value: 'CS' },
		{ key: 'Algorithm', value: '알고리즘' },
	],
}

const WritePage = () => {
	const navigate = useNavigate()
	const fileRef = useRef<HTMLInputElement>(null)
	const readRef = useRef<HTMLDivElement>(null)
	const [markdownText, setMarkdownText] = useState('')
	const [title, setTitle] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [selectedSubCategory, setSelectedSubCategory] = useState<string>('')

	const handleUploadFile = () => {
		if (fileRef.current) {
			fileRef.current.click()
		}
	}

	const handleBack = (e: React.MouseEvent) => {
		e.preventDefault()
		navigate(-1)
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const newImages = Array.from(files).map((file) => {
				const url = URL.createObjectURL(file)
				return `![](${url})`
			})
			setMarkdownText((prev) => prev + newImages.join('\n'))
		}
	}

	const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/gi //복붙한 http 형식의 이미지 링크 렌더링 시킬 수 있도록 추가
		let content = e.target.value
		content = content.replace(imageRegex, (url) => {
			if (!content.includes(`![](${url})`)) {
				return `![](${url})`
			}
			return url
		})
		setMarkdownText(content)

		if (readRef.current) {
			readRef.current.scrollTop = readRef.current.scrollHeight
		}
	}

	const handleSelectedData = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(e.target.value)
		setSelectedSubCategory('')
	}

	const handleSubData = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSubCategory(e.target.value)
	}

	return (
		<Container>
			<div className="area-write">
				<input
					className="write-title"
					type="text"
					value={title}
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
							options={selectData}
							selectedValue={selectedCategory}
							placeholder="카테고리 선택"
							handleChange={handleSelectedData}
						/>
						<SelectBox
							options={selectedCategory ? subData[selectedCategory as keyof typeof subData] : []}
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
					value={markdownText}
					onChange={handleContent}
				/>
				<div className="area-footer">
					<IconButton onClick={handleBack}>
						<ArrowLeft size={25} />
						나가기
					</IconButton>
					<div className="area-button">
						<Button variant="secondary" radius={50}>
							임시저장
						</Button>
						<Button radius={50}>등록하기</Button>
					</div>
				</div>
			</div>
			<div ref={readRef} className="area-read">
				<div className="title">{title}</div>
				<RenderMarkdown markdown={markdownText} />
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
	.write-title {
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

		.write-title {
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

		.title {
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
