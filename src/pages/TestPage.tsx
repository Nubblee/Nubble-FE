import { GetStudyCommit, type FileContent } from '@/api/getStudyCommit'
import { fontSize, fontWeight } from '@/constants/font'
import styled from '@emotion/styled'

const TestPage = () => {
	const { commitData } = GetStudyCommit()
	return (
		<Container>
			<h3>{}</h3>
			{commitData.map((file: FileContent) => (
				<div key={`${file.title}-${file.author}`}>
					<div className="sub-title">{file.title}</div>
					<div className="upload-info">
						<div className="sub-date">{file.date}</div>
						<div className="btn">
							<div className="delete">삭제</div>
							<div className="update">수정</div>
						</div>
					</div>
					<div className="sub-author">{file.author}</div>
					<pre>{file.content}</pre>
				</div>
			))}
		</Container>
	)
}

export default TestPage

const Container = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 1080px;
	height: 100%;
	background-color: black;
	line-height: 25px;

	.sub-title {
		font-size: ${fontSize.xxxxl};
		font-weight: ${fontWeight.bold};
	}
	.upload-info {
		display: flex;
		justify-content: space-between;
		margin: 10px 0;

		.btn {
			display: flex;
			gap: 10px;
		}
	}

	.sub-author {
		font-size: ${fontSize.lg};
		font-weight: ${fontWeight.semiBold};
	}
`
