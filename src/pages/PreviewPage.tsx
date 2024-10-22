import React from 'react'
import styled from '@emotion/styled'
import { ImagePlus } from 'lucide-react'
import colors from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import Button from '@components/Button'
import { useWriteStore } from '@/stores/writeStore'
import useGoBack from '@/hooks/useGoBack'

const PreviewPage = () => {
	const title = useWriteStore((state) => state.title)
	const content = useWriteStore((state) => state.content)
	const thumbnail = useWriteStore((state) => state.thumbnailImg)
	const handleBack = useGoBack()

	return (
		<Container>
			<Title>게시물 미리보기</Title>
			<PreviewContainer>
				<ThumnailContainer>
					<div className="image-span">
						<span>재업로드</span>
						<span>제거</span>
					</div>
					<div
						className="thumnail-upload"
						style={{
							backgroundImage: thumbnail ? `url(${thumbnail})` : 'none',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						{!thumbnail ? (
							<ImagePlus size={200} strokeWidth={1} color={colors.deleteGray} />
						) : (
							<form>
								<label htmlFor="thumbnailImg" className="img-label">
									썸네일 업로드
								</label>
								<input type="file" accept="image/*" id="thumbnailImg" className="img-input" />
							</form>
						)}
					</div>
				</ThumnailContainer>
				<Line />
				<PostPreviewContainer>
					<div className="post-title">{title}</div>
					<textarea defaultValue={content} className="post-content" />
					<span className="count">{content.length}/150</span>
				</PostPreviewContainer>
			</PreviewContainer>
			<ButtonContainer>
				<Button variant="secondary" radius={50} onClick={handleBack}>
					취소
				</Button>
				<Button radius={50}>등록하기</Button>
			</ButtonContainer>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: calc(100vh - 100px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Title = styled.div`
	font-size: ${fontSize.xxxxxl};
	font-weight: ${fontWeight.semiBold};
	margin-bottom: 54px;
`

const PreviewContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 40px;
`

const ThumnailContainer = styled.div`
	.thumnail-upload {
		width: 456px;
		height: 260px;
		background-color: ${colors.mainGray};
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.image-span {
		text-align: right;
		color: ${colors.commentGray};
		margin-bottom: 10px;

		span {
			margin-left: 10px;
			cursor: pointer;

			&:hover {
				color: ${colors.white};
			}
		}
	}

	.img-label {
		background-color: ${colors.bgBlack};
		color: ${colors.primaryBlue};
		padding: 8px 40px;
		border-radius: 5px;
		cursor: pointer;
		display: inline-block;
		font-weight: ${fontWeight.semiBold};

		&:hover {
			background-color: ${colors.mainBlack};
			font-weight: ${fontWeight.extraBold};
		}
	}

	.img-input {
		display: none;
	}
`

const Line = styled.div`
	height: 432px;
	width: 1px;
	background-color: ${colors.commentGray};
	margin: 0 28px;
`

const PostPreviewContainer = styled.div`
	margin-top: 10px;
	.post-title {
		font-size: ${fontSize.xxxl};
		font-weight: ${fontWeight.bold};
		color: #d9d9d9;
		margin-bottom: 18px;
	}

	.post-content {
		width: 456px;
		height: 260px;
		background-color: ${colors.mainGray};
		border: none;
		color: ${colors.commentGray};
		padding: 24px 14px;
		font-size: ${fontSize.md};
	}

	.count {
		display: block;
		margin-top: 10px;
		text-align: right;
		color: ${colors.commentGray};
	}
`

const ButtonContainer = styled.div`
	width: 970px;
	display: inline;
	text-align: right;
`
export default PreviewPage
