import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
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
	date?: string
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

const formatDate = (date: Date) => {
	return dayjs(date).locale('ko').format('YYYY년 MM월 DD일')
}

const headers = { Authorization: `${process.env.GITHUB_TOKEN}` }
//문제 제목 공백 제거, 소문자로 통일시키는 함수
const normalizeString = (str: string) => {
	return str
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
	const path = title.slice(3, 4)
	const url = `https://api.github.com/repos/${userId}/Algorithm/contents/프로그래머스/${path}`

	try {
		const res = await axios.get(url, { headers })

		const data: GitHubFileInfo[] = await res.data

		//LV.n 부분을 제외한 타이틀 이름만 가져옴 (블로그에 등재된 문제 타이틀)
		const titleWithoutLv = title.replace(/^Lv\.\d+\s*/, '')
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
		const content = atob(fileData.content.replace(/\n/g, ''))
		const commitDate = await getFileCommitInfo(userId, fileMatch.path)
		const date = formatDate(commitDate)

		return [{ title: fileMatch.name, content, date }]
	} catch (error) {
		console.error(`Error fetching file contents: ${path}`, error)
		return []
	}
}

export const GetStudyCommit = () => {
	const [commitData, setCommitData] = useState<FileContent[]>([])

	//등록된 문제 목록 가져오는 api 들어오면됨
	const testSubjects = [
		{
			id: 1,
			title: 'Lv.2 귤 고르기',
			date: new Date(),
			url: 'https://school.programmers.co.kr/learn/courses/30/lessons/138476',
		},
		{
			id: 2,
			title: 'Lv.0 겹치는 선분의 길이',
			date: new Date(),
			url: 'https://school.programmers.co.kr/learn/courses/30/lessons/120876',
		},
		{
			id: 3,
			title: 'Lv.0 안전지대',
			date: new Date(),
			url: 'https://school.programmers.co.kr/learn/courses/30/lessons/120866',
		},
		{
			id: 4,
			title: 'Lv.0 다음에 올 숫자',
			date: new Date(),
			url: 'https://school.programmers.co.kr/learn/courses/30/lessons/120924',
		},
		{
			id: 5,
			title: 'Lv.0 qr code',
			date: new Date(),
			url: 'https://school.programmers.co.kr/learn/courses/30/lessons/181903',
		},
		{
			id: 6,
			title: 'Lv.0 리스트 자르기',
			date: new Date(),
			url: 'https://school.programmers.co.kr/learn/courses/30/lessons/181897',
		},
		{
			id: 7,
			title: 'Lv.0 특수문자 출력하기',
			date: new Date(),
			url: 'https://school.programmers.co.kr/learn/courses/30/lessons/181948',
		},
		{
			id: 8,
			title: 'Lv.0 머쓱이보다 키 큰 사람',
			date: new Date(),
			url: 'https://school.programmers.co.kr/learn/courses/30/lessons/120585',
		},
	]

	const fetchCommits = async () => {
		const allCommits = await Promise.all(
			testAuthor.flatMap((user) =>
				testSubjects.map((sub) =>
					getFileContents(user.userId, sub.title).then((files) => {
						return files.map((file) => ({
							...file,
							author: user.name,
							title: sub.title,
						}))
					}),
				),
			),
		)

		const sortedCommits = allCommits.flat().filter((file) => file)
		sortedCommits.sort((a, b) => a.title.localeCompare(b.title))
		setCommitData(sortedCommits)
	}

	useEffect(() => {
		fetchCommits()
	}, [])

	return { commitData }
}
