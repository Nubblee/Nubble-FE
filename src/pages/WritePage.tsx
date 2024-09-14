import React, { useRef, useState } from 'react'
import { ImagePlus, ArrowLeft } from 'lucide-react'
import styled from '@emotion/styled'
import colors from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import Button from '@components/Button'
import RenderMarkdown from '@components/RenderMarkdown'

const WritePage = () => {
	const fileRef = useRef<HTMLInputElement>(null)
	const [markdownText, setMarkdownText] = useState('')
	const [title, setTitle] = useState('')

	const handleUploadFile = () => {
		if (fileRef.current) {
			fileRef.current.click()
		}
	}

	const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdownText(e.target.value)
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
					<div className="section-selectbox">셀렉트박스</div>
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
