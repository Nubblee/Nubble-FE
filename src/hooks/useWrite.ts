import { useWriteStore } from '@/stores/writeStore'

export default function useWrite() {
	const markdownContent = useWriteStore((state) => state.content)
	const markdownTitle = useWriteStore((state) => state.title)
	const categories = useWriteStore((state) => state.category)
	const boardId = useWriteStore((state) => state.boardId)
	const setTitle = useWriteStore((state) => state.setTitle)
	const setContent = useWriteStore((state) => state.setContent)
	const setThumbnail = useWriteStore((state) => state.setThumbnail)
	const setCategories = useWriteStore((state) => state.setCategory)
	const setBoardId = useWriteStore((state) => state.setBoardId)
	return {
		markdownContent,
		markdownTitle,
		categories,
		boardId,
		setTitle,
		setContent,
		setThumbnail,
		setCategories,
		setBoardId,
	}
}
