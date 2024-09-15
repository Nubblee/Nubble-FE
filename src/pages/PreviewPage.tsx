import React from 'react'
import styled from '@emotion/styled'
import { ImagePlus } from 'lucide-react'
import colors from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import Button from '@components/Button'

const postData = {
	title: '언어모델 로봇 ML',
	content:
		'오늘날 머신러닝(machine learning, ML) 모델 개발은 대부분 NVIDIA의 데이터센터 GPU(예: A100)나 워크스테이션 GPU(예: RTX4090)가 장착된 고성능 서버 환경에서 이루어집니다. ',
}

const PreviewPage = () => {
	return (
		<Container>
			<Title>게시물 미리보기</Title>
			<PreviewContainer>
				<ThumnailContainer>
					<div className="image-span">
						<span>재업로드</span>
						<span>제거</span>
					</div>
					<div className="thumnail-upload">
						<ImagePlus size={200} strokeWidth={1} color={colors.deleteGray} />
						<form>
							<label htmlFor="thumnailImg" className="img-label">
								썸네일 업로드
							</label>
							<input type="file" accept="image/*" id="profileImg" className="img-input" />
						</form>
					</div>
				</ThumnailContainer>
				<Line />
				<PostPreviewContainer>
					<div className="post-title">{postData.title}</div>
					<textarea defaultValue={postData.content} className="post-content" />
					<span className="count">{postData.content.length}/150</span>
				</PostPreviewContainer>
			</PreviewContainer>
			<ButtonContainer>
				<Button variant="secondary" radius={50}>
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
