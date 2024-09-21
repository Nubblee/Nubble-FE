import { create } from 'zustand'

interface AuthState {
	isLogin: boolean
	userId: string | null
	login: (id: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	isLogin: false,
	userId: null,
	login: (id: string) => set({ isLogin: true, userId: id }),
}))
