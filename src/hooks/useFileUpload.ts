import { useState } from 'react'
import axios from 'axios'

const useFileUpload = () => {
	const [failed, setFailed] = useState('')
	const sessionId = localStorage.getItem('sessionId')

	const uploadFile = async (file: File) => {
		try {
			const formData = new FormData()
			formData.append('file', file)
			console.log(`${import.meta.env.VITE_NUBBLE_SERVER}`)
			const res = await axios.post(`${import.meta.env.VITE_NUBBLE_SERVER}/files`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'SESSION-ID': sessionId,
				},
			})
			return res.data
		} catch (error) {
			setFailed('파일 업로드 실패')
		}
	}

	return {
		uploadFile,
	}
}

export default useFileUpload
