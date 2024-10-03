import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{ find: '@components', replacement: '/src/components' },
			{ find: '@', replacement: '/src' },
		],
	},
	define: {
		'process.env': {
			GITHUB_TOKEN: JSON.stringify(process.env.VITE_GITHUB_TOKEN),
		},
	},
})
