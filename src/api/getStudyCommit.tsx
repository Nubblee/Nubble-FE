import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

interface User {
	name: string
	username: string
}

interface GitHubFileInfo {
	name: string
	type: string
	url: string
	path: string
}

export interface FileContent {
	name: string
	content: string
	date?: string
}

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

const getFileCommitInfo = async (username: string, filePath: string) => {
	const url = `https://api.github.com/repos/${username}/Algorithm/commits?path=${filePath}`
	try {
		const res = await fetch(url, { headers })
		if (!res.ok) throw new Error('not commit')

		const commitData = await res.json()
		if (commitData.length === 0) return null

		const commitDate = commitData[0].commit.author.date
		return commitDate
	} catch (error) {
		return null
	}
}

const getFileContents = async (username: string, title: string): Promise<FileContent[]> => {
	const path = title.slice(3, 4)
	const url = `https://api.github.com/repos/${username}/Algorithm/contents/프로그래머스/${path}`

	try {
		const res = await fetch(url, { headers })
		if (!res.ok) throw new Error('failed to fetch github api url')

		const data: GitHubFileInfo[] = await res.json()

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
		const folderRes = await fetch(folderUrl, { headers })
		if (!folderRes.ok) throw new Error('failed to folderRes')

		//문제 타이틀 폴더 내 문제풀이 js파일 가져오는 로직
		const folderData: GitHubFileInfo[] = await folderRes.json()
		const fileMatch = folderData.find((item) => {
			return `${normalizeString(folderMatch.name)}.js`.includes(normalizeString(item.name))
		})
		if (!fileMatch) return []

		const fileRes = await fetch(fileMatch.url, { headers })
		const fileData = await fileRes.json()

		//js 파일 내 문제풀이 (atob를 통해 base64로 되어있는 문제풀이 디코딩해서 문자열로 변환)
		const content = atob(fileData.content.replace(/\n/g, ''))
		const commitDate = await getFileCommitInfo(username, fileMatch.path)
		const date = formatDate(commitDate)

		return [{ name: fileMatch.name, content, date }]
	} catch (error) {
		console.error(`Error fetching file contents: ${path}`, error)
		return []
	}
}

export const GetStudyCommit = (users: User[]) => {
	const [commitData, setCommitData] = useState<{ [key: string]: FileContent[] }>({})
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')

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

	useEffect(() => {
		const fetchCommits = async () => {
			const allCommits = await Promise.all(
				users.flatMap((user) =>
					testSubjects.map((sub) =>
						getFileContents(user.username, sub.title).then((files) => {
							setTitle(sub.title)
							setAuthor(user.name)
							return {
								key: `${user.username}-${sub.title}`,
								files,
							}
						}),
					),
				),
			)

			const newCommitData = allCommits.reduce(
				(acc: { [key: string]: FileContent[] }, { key, files }) => {
					if (files.length > 0) {
						acc[key] = files
					}
					return acc
				},
				{},
			)
			setCommitData(newCommitData)
		}

		fetchCommits()
	}, [])
	console.log(commitData)

	return { commitData }
}
