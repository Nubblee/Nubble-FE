import axios from 'axios'
import { useEffect } from 'react'

const useCheckSession = () => {
	useEffect(() => {
		const checkSessionStatus = async () => {
			try {
				await axios.get(
					'http://nubble-backend-eb-1-env.eba-f5sb82hp.ap-northeast-2.elasticbeanstalk.com/auth/sessions/validate',
					{
						withCredentials: true,
					},
				)
				console.log('로그인 된 상태')
			} catch (error) {
				console.error('로그인 안됨 ㅠㅠ', error)
				localStorage.removeItem('sessionId')
				localStorage.removeItem('id')
			}
		}

		checkSessionStatus()
	}, [])
}

export default useCheckSession
