import React, { useState } from 'react'

const useCategory = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [selectedSubCategory, setSelectedSubCategory] = useState<string>('')

	const handleSelectedData = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(e.target.value)
		setSelectedSubCategory('')
	}

	const handleSubData = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSubCategory(e.target.value)
	}

	return {
		selectedCategory,
		selectedSubCategory,
		setSelectedCategory,
		setSelectedSubCategory,
		handleSelectedData,
		handleSubData,
	}
}

export default useCategory
