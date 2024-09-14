import React, { useRef, useState } from 'react'
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
	{
		key: 'cote',
		value: '코딩테스트',
	},
]

const subData = {
	study: [
		{ key: 'cs', value: 'CS' },
		{ key: 'Algorithm', value: '알고리즘' },
	],
	cote: [
		{ key: 'lv0', value: 'LV.0' },
		{ key: 'lv1', value: 'LV.1' },
		{ key: 'lv2', value: 'LV.2' },
	],
}

const WritePage = () => {
	const fileRef = useRef<HTMLInputElement>(null)
	const [markdownText, setMarkdownText] = useState('')
	const [title, setTitle] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [selectedSubCategory, setSelectedSubCategory] = useState<string>('')

	const handleUploadFile = () => {
		if (fileRef.current) {
			fileRef.current.click()
		}
	}

	const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdownText(e.target.value)
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
					<input type="file" multiple ref={fileRef} style={{ display: 'none' }} />
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
					<IconButton>
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
			<div className="area-read">
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
			color: ${colors.white};
			margin: 30px 0px;
		}

		input::placeholder {
			color: ${colors.commentGray};
		}

		textarea {
			border: none;
			outline: none;
		}

		.content {
			width: 100%;
			overflow-y: auto;
			background-color: inherit;
			color: ${colors.commentGray};
			border: none;
			padding: 10px;
			resize: none;
			height: calc(100vh - 250px);
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
		margin: 10px 0 20px;

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
