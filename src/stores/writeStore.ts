import { create } from 'zustand'

interface writeState {
	title: string
	thumbnailImg: string
	content: string
	description: string
	category: string
	board: string
	boardId: number
	setTitle: (newTitle: string) => void
	setThumbnail: (newContent: string) => void
	setContent: (newContent: string) => void
	setDescription: (newDescription: string) => void
	setCategory: (newCategory: string) => void
	setBoard: (newSubCategory: string) => void
	setBoardId: (newBoard: number) => void
}

export const useWriteStore = create<writeState>((set) => ({
	title: '',
	thumbnailImg: '',
	content: '',
	description: '',
	category: '',
	board: '',
	boardId: 0,
	setTitle: (newTitle) => set({ title: newTitle }),
	setContent: (newContent) => set({ content: newContent }),
	setThumbnail: (newContent) => {
		const match = newContent.match(/!\[\]\((.*?)\)/)
		const newThumbnail = match && match[1] ? match[1] : ''
		set((state) => {
			if (state.thumbnailImg !== newThumbnail) {
				return { thumbnailImg: newThumbnail }
			}
			return state
		})
	},
	setDescription: (newDescription) => set({ description: newDescription.slice(0, 150) }),
	setCategory: (newCategory) => {
		set({ category: newCategory })
	},
	setBoard: (newSubCategory) => {
		set({ board: newSubCategory })
	},
	setBoardId: (newBoard) => set({ boardId: newBoard }),
}))
