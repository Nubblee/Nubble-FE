import { useWriteStore } from '@/stores/writeStore'

export default function useWrite() {
	const markdownContent = useWriteStore((state) => state.content)
	const markdownTitle = useWriteStore((state) => state.title)
	const categories = useWriteStore((state) => state.category)
	const boardId = useWriteStore((state) => state.boardId)
	const thumbnail = useWriteStore((state) => state.thumbnailImg)
	const description = useWriteStore((state) => state.description)
	const setTitle = useWriteStore((state) => state.setTitle)
	const setContent = useWriteStore((state) => state.setContent)
	const setThumbnail = useWriteStore((state) => state.setThumbnail)
	const setCategories = useWriteStore((state) => state.setCategory)
	const setBoardId = useWriteStore((state) => state.setBoardId)
	const setDescription = useWriteStore((state) => state.setDescription)

	const reset = () => {
		setTitle('')
		setContent('')
		setThumbnail('')
		setDescription('')
		setCategories([])
		setBoardId(0)
	}

	return {
		markdownContent,
		markdownTitle,
		categories,
		thumbnail,
		boardId,
		description,
		setTitle,
		setContent,
		setThumbnail,
		setCategories,
		setBoardId,
		setDescription,
		reset,
	}
}
