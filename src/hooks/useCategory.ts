import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useWriteStore } from '@/stores/writeStore'

const useCategory = () => {
	const category = useWriteStore((state) => state.category)
	const setCategory = useWriteStore((state) => state.setCategory)
	const board = useWriteStore((state) => state.board)
	const setBoard = useWriteStore((state) => state.setBoard)
	const [categories, setCategories] = useState([])
	const [boards, setBoards] = useState([])

	const fetchCategory = async () => {
		const res = await axios.get(`${import.meta.env.VITE_NUBBLE_SERVER}/categories`, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		setCategories(res.data.categories)
	}

	const fetchBoards = async (categoryId: string) => {
		const res = await axios.get(
			`${import.meta.env.VITE_NUBBLE_SERVER}/categories/${categoryId}/boards`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		setBoards(res.data.boards)
	}

	const handleSelectedData = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value) {
			setCategory(e.target.value)
			fetchBoards(e.target.value)
		}
	}

	const handleSubData = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setBoard(e.target.value)
	}

	useEffect(() => {
		fetchCategory()
	}, [])

	useEffect(() => {
		if (category) {
			fetchBoards(category)
		}
	}, [category])

	return {
		category,
		board,
		categories,
		boards,
		setCategory,
		setBoard,
		fetchBoards,
		handleSelectedData,
		handleSubData,
	}
}

export default useCategory
