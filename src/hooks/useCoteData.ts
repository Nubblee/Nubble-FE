import { useEffect, useState } from 'react'
import axios from 'axios'

interface GitHubFileInfo {
	name: string
	type: string
	url: string
	path: string
}

export interface FileContent {
	title: string
	author?: string
	content: string
	date: Date
	isCote?: boolean
}

export interface coteDataProps {
	problemId: number
	quizDate: string
	problemTitle: string
	url: string
}

//유저 정보 가져오는 api들어오면 됨
const testAuthor = [
	{
		name: '박지영',
		userId: 'jizerozz',
	},
	{
		name: '김수민',
		userId: 'ssuminii',
	},
	{
		name: '손성오',
		userId: 'Sonseongoh',
	},
]

const headers = { Authorization: `${import.meta.env.VITE_GITHUB_TOKEN}` }
//문제 제목 공백 제거, 소문자로 통일시키는 함수
const normalizeString = (str: string) => {
	return str
		.trim()
		.replace(/\s+/g, '')
		.replace(/\u00A0/g, '')
		.toLowerCase()
}

const getFileCommitInfo = async (userId: string, filePath: string) => {
	const url = `https://api.github.com/repos/${userId}/Algorithm/commits?path=${filePath}`
	try {
		const res = await axios.get(url, { headers })
		const commitData = await res.data

		if (commitData.length === 0) return null

		const commitDate = commitData[0].commit.author.date
		return commitDate
	} catch (error) {
		return null
	}
}

const getFileContents = async (userId: string, title: string): Promise<FileContent[]> => {
	const path = title.slice(2, 3)
	const url = `https://api.github.com/repos/${userId}/Algorithm/contents/프로그래머스/${path}`

	try {
		const res = await axios.get(url, { headers })
		const data: GitHubFileInfo[] = await res.data

		//LV.n 부분을 제외한 타이틀 이름만 가져옴 (블로그에 등재된 문제 타이틀)
		const titleWithoutLv = title.slice(5)

		const titleWithoutBlank = normalizeString(titleWithoutLv)

		// git에 올라간 커밋의 제목들에서 블로그에 등재된 문제 타이틀과 일치한 문제 타이틀을 뽑아옴
		const folderMatch = data.find(
			(item) => item.type === 'dir' && normalizeString(item.name).includes(titleWithoutBlank),
		)
		if (!folderMatch) return []

		//문제 타이틀 폴더 내 들어있는 파일들 조회
		const folderUrl = folderMatch.url
		const folderRes = await axios.get(folderUrl, { headers })

		//문제 타이틀 폴더 내 문제풀이 js파일 가져오는 로직
		const folderData: GitHubFileInfo[] = await folderRes.data
		const fileMatch = folderData.find((item) => {
			return `${normalizeString(folderMatch.name)}.js`.includes(normalizeString(item.name))
		})
		if (!fileMatch) return []

		const fileRes = await axios.get(fileMatch.url, { headers })
		const fileData = await fileRes.data

		//js 파일 내 문제풀이 (atob를 통해 base64로 되어있는 문제풀이 디코딩해서 문자열로 변환)
		const content = new TextDecoder('utf-8').decode(
			new Uint8Array([...atob(fileData.content.replace(/\n/g, ''))].map((c) => c.charCodeAt(0))),
		)
		const commitDate = await getFileCommitInfo(userId, fileMatch.path)
		const date = commitDate

		return [{ title: fileMatch.name, content, date }]
	} catch (error) {
		return []
	}
}

export const useCoteData = () => {
	const [commitData, setCommitData] = useState<FileContent[]>([])
	const [coteDatas, setCoteDatas] = useState<coteDataProps[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const fetchcoteDatas = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_NUBBLE_SERVER}/coding-problems`)
			setCoteDatas(res.data.problems)
			fetchCommits()
		} catch (error) {
			setError('문제 목록 데이터를 불러오는 중 오류가 발생.')
		} finally {
			setLoading(false)
		}
	}

	const fetchCommits = async () => {
		try {
			const allCommits = await Promise.all(
				coteDatas.flatMap((sub) =>
					testAuthor.map((user) =>
						getFileContents(user.userId, sub.problemTitle).then((files) => {
							return files.map((file) => ({
								...file,
								author: user.name,
								title: sub.problemTitle,
								isCote: true,
							}))
						}),
					),
				),
			)

			const sortedCommits: FileContent[] = allCommits.flat().filter((file) => file)

			sortedCommits
				.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
				.sort((a, b) => a.title.localeCompare(b.title))

			setCommitData(sortedCommits)
		} catch (error) {
			setError('코딩 테스트 문제풀이를 불러오는 중 오류가 발생.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchcoteDatas()
	}, [])

	useEffect(() => {
		if (coteDatas.length > 0) {
			fetchCommits()
		}
	}, [coteDatas])

	return { commitData, loading }
}
