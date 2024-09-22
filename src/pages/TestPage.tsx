import { GetStudyCommit, FileContent } from '@/api/getStudyCommit'
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
					<h3>{key}</h3>
					{files.map((file: FileContent) => (
						<div key={file.name}>
							<h4>{file.name}</h4>
							<div className="upload-date">{file.date}</div>
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
`
