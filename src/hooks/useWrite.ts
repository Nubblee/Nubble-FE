import { useWriteStore } from '@/stores/writeStore'

export default function useWrite() {
	const markdownContent = useWriteStore((state) => state.content)
	const markdownTitle = useWriteStore((state) => state.title)
	const category = useWriteStore((state) => state.category)
	const board = useWriteStore((state) => state.board)
	const boardId = useWriteStore((state) => state.boardId)
	const thumbnail = useWriteStore((state) => state.thumbnailImg)
	const description = useWriteStore((state) => state.description)
	const setTitle = useWriteStore((state) => state.setTitle)
	const setContent = useWriteStore((state) => state.setContent)
	const setThumbnail = useWriteStore((state) => state.setThumbnail)
	const setCategory = useWriteStore((state) => state.setCategory)
	const setBoard = useWriteStore((state) => state.setBoard)
	const setBoardId = useWriteStore((state) => state.setBoardId)
	const setDescription = useWriteStore((state) => state.setDescription)

	const reset = () => {
		setTitle('')
		setContent('')
		setThumbnail('')
		setDescription('')
		setCategory('')
		setBoard('')
		setBoardId(0)
	}

	return {
		markdownContent,
		markdownTitle,
		category,
		thumbnail,
		board,
		boardId,
		description,
		setTitle,
		setContent,
		setThumbnail,
		setCategory,
		setBoard,
		setBoardId,
		setDescription,
		reset,
	}
}
