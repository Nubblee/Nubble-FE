import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import styled from '@emotion/styled'

export type toastType = 'success' | 'failed'

export function ShowToast(message: string, toastType = 'success') {
	if (toastType === 'success') {
		toast.success(`${message}`, {
			autoClose: 2000,
			theme: 'dark',
			draggable: true,
		})
	} else {
		toast.error(`${message}`, {
			autoClose: 2000,
			theme: 'dark',
			draggable: true,
		})
	}
}

export default function Toast() {
	return <StyledToastContainer />
}

export const StyledToastContainer = styled(ToastContainer)`
	.Toastify__toast {
		background-color: #3d3d3d;
		color: #ffffff;
	}
`
