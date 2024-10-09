import React from 'react'
import { useNavigate } from 'react-router-dom'

const useGoBack = () => {
	const navigate = useNavigate()

	const handleBack = (e: React.MouseEvent) => {
		e.preventDefault()
		navigate(-1)
	}

	return handleBack
}

export default useGoBack
