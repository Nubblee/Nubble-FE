import { create } from 'zustand'

interface AuthState {
	isLogin: boolean
	sessionId: string | null
	userId: string | null
	login: (sessionId: string, userId: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	isLogin: localStorage.getItem('sessionId') ? true : false,
	sessionId: localStorage.getItem('sessionId'),
	userId: localStorage.getItem('userId'),
	login: (sessionId: string, userId: string) => {
		localStorage.setItem('sessionId', sessionId)
		localStorage.setItem('userId', userId)
		set({ isLogin: true, sessionId, userId })
	},
}))
