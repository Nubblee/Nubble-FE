import { create } from 'zustand'

interface AuthState {
	isLogin: boolean
	sessionId: string | null
	userId: string | null
	userName: string | null
	login: (sessionId: string, userId: string, userName: string) => void
	logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
	isLogin: localStorage.getItem('sessionId') ? true : false,
	sessionId: localStorage.getItem('sessionId'),
	userId: localStorage.getItem('userId'),
	userName: localStorage.getItem('userName'),
	login: (sessionId: string, userId: string, userName: string) => {
		set({ isLogin: true, sessionId, userId, userName })
	},
	logout: () => {
		localStorage.removeItem('sessionId')
		localStorage.removeItem('userId')
		localStorage.removeItem('userName')
		set({ isLogin: false, sessionId: null, userId: null, userName: null })
	},
}))
