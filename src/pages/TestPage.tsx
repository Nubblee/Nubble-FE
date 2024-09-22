import { GetStudyCommit, FileContent } from '@/api/getStudyCommit'
import { fontSize, fontWeight } from '@/constants/font'
import styled from '@emotion/styled'

const testAuthor = [
	{
		name: '박지영',
		username: 'jizerozz',
	},
	{
		name: '김수민',
		username: 'ssuminii',
	},
	{
		name: '손성오',
		username: 'Sonseongoh',
	},
]

const TestPage = () => {
	const { commitData } = GetStudyCommit(testAuthor)
	return (
		<Container>
			{Object.entries(commitData).map(([key, files]) => (
				<div key={key}>
					<h3>{}</h3>
					{files.map((file: FileContent) => (
						<div key={file.name}>
							<div className="sub-title">{file.name}</div>
							<div className="upload-info">
								<div className="sub-date">{file.date}</div>
								<div className="btn">
									<div className="delete">삭제</div>
									<div className="update">수정</div>
								</div>
							</div>
							<div className="sub-author">{key.split('-')[0]}</div>
							<pre>{file.content}</pre>
						</div>
					))}
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
