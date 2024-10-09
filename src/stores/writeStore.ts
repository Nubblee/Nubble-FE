import { create } from 'zustand'

interface previewState {
	title: string
	thumbnailImg: string
	content: string
	setTitle: (newTitle: string) => void
	setThumbnail: (newContent: string) => void
	setContent: (newContent: string) => void
}

export const usePreviewStore = create<previewState>((set) => ({
	title: '',
	thumbnailImg: '',
	content: '',
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
}))
