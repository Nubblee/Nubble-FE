import { categoryProps } from '@components/SelectBox'
import { create } from 'zustand'

interface writeState {
	title: string
	thumbnailImg: string
	content: string
	category: categoryProps[]
	boardId: number
	setTitle: (newTitle: string) => void
	setThumbnail: (newContent: string) => void
	setContent: (newContent: string) => void
	setCategory: (newCategory: categoryProps[]) => void
	setBoardId: (newBoard: number) => void
}

export const useWriteStore = create<writeState>((set) => ({
	title: '',
	thumbnailImg: '',
	content: '',
	category: [],
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
	setCategory: (newCategory) =>
		set((state) => {
			return { ...state, category: newCategory }
		}),
	setBoardId: (newBoard) => set({ boardId: newBoard }),
}))
